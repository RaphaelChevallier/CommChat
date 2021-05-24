const { stdinToStream, streamToConsole } = require('./stream')
const PeerId = require('peer-id');
require('dotenv').config()

async function dial(node, protocol) {
  // Output this node's address
  console.log('Dialer ready')

  // Dial to the remote peer (the "listener") 
  // const { stream }= await node.dialProtocol(PeerId.createFromB58String('QmPnYBkqiW3RQ8wVJEc4ek4hCYjC85ezcS4BsYMXkyTAVn'), protocol) //phone
  const { stream } = await node.dialProtocol(PeerId.createFromB58String('QmWZS3WDmLAJ2bLwnp74BMh1BA1byuEbXPU3rwQmmLYudi'), protocol) //laptop
//   const listenerMa = multiaddr(`/ip4/127.0.0.1/tcp/10333/p2p/${idListener.toB58String()}`)
//   const { stream } = await nodeDialer.dialProtocol(listenerMa, '/chat/1.0.0')

  console.log('Dialer dialed to listener on protocol: /chat/phone')
  console.log('Type a message and see what happens')

  // // Send stdin to the stream
  stdinToStream(stream)
  // // Read the stream and output to console
  // streamToConsole(stream)
}

module.exports = {
    dial
  }