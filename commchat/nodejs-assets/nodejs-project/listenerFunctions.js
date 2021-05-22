const { stdinToStream, streamToConsole } = require('./stream')
const PeerId = require('peer-id')

async function listen(node) {
  // Log a message when a remote peer connects to us
  node.connectionManager.on('peer:connect', (connection) => {
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  node.connectionManager.on('peer:disconnect', (connection) => {
    node.hangUp(connection.remotePeer)
    node.unhandle("/chat/1.0.0")
    handleChat()
    console.log('disconnected peer: ', connection.remotePeer.toB58String())
  })


  async function handleChat () {
    // Handle messages for the protocol
    await node.handle('/chat/1.0.0', async ({ stream }) => {
      // Send stdin to the stream
      stdinToStream(stream)
      // Read the stream and output to console
      streamToConsole(stream)
    })
  }

  handleChat()

  // Output listen addresses to the console
  console.log('Listener ready, listening on:')
  node.multiaddrs.forEach((ma) => {
    console.log(ma.toString() + '/p2p/' + node.peerId.toB58String())
  })
}

module.exports = {
    listen
  }