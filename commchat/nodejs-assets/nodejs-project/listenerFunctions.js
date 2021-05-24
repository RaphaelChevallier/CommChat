const { handleChat } = require('./handleChat')
const { dial } = require('./dialerFunctions')

async function listen(node) {
  var count = 0
  // Log a message when a remote peer connects to us
  node.connectionManager.on('peer:connect', (connection) => {
    // handleChat(node) // read stream
    console.log(count)
    count = count + 1
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  node.connectionManager.on('peer:disconnect', (connection) => {
    console.log('disconnected peer')
  })

  handleChat(node)

  // Output listen addresses to the console
  console.log('Listener ready, listening on:')
  node.multiaddrs.forEach((ma) => {
    console.log(ma.toString() + '/p2p/' + node.peerId.toB58String())
  })
}

module.exports = {
    listen
  }