const { stdinToStream, streamToConsole } = require('./stream')
const { dial } = require('./dialerFunctions')

async function handleChat(node) {
  // Handle messages for the protocol
  await node.handle('/chat/phone', async ({ stream }) => {
    // Send stdin to the stream
    stdinToStream(stream)
    // Read the stream and output to console
    streamToConsole(stream)
  })
}

async function listen(node) {
  // Log a message when a remote peer connects to us
  node.connectionManager.on('peer:connect', (connection) => {
    handleChat(node)
    // dial(node, '/chat/laptop') //make it bidirectional
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  node.connectionManager.on('peer:disconnect', (connection) => {
    await node.unhandle('/chat/phone')
    console.log('disconnected peer')
  })


  // Output listen addresses to the console
  console.log('Listener ready, listening on:')
  node.multiaddrs.forEach((ma) => {
    console.log(ma.toString() + '/p2p/' + node.peerId.toB58String())
  })
}

module.exports = {
    listen
  }