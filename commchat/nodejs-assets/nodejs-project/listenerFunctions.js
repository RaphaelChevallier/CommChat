const { stdinToStream, streamToConsole } = require('./stream')
const { handleChat } = require('./handleChats')
const { dial } = require('./dialerFunctions')

async function listen(node) {

  handleChat(node)
  // Log a message when a remote peer connects to us
  node.connectionManager.on('peer:connect', (connection) => {
    handleChat(node)
    // dial(node, '/chat/laptop') //make it bidirectional
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  node.connectionManager.on('peer:disconnect', (connection) => {
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