// var rn_bridge = require('rn-bridge');
const privateLibp2pNode = require('./nodeP2P')
const PeerId = require('peer-id');
const multiaddr = require('multiaddr')
const fs = require('fs');
// const { stdinToStream, streamToConsole } = require('./stream')
const { dial }= require('./dialerFunctions')
const { listen } = require('./listenerFunctions')
require('dotenv').config()
const SWARM_KEY = new Uint8Array(process.env.SWARM_KEY.split(","))

function addPeerDB(node, addedNodePeerID, addedNodeMultiAddrs, stringPeerId){
  const added = node.peerStore.addressBook.set(addedNodePeerID, addedNodeMultiAddrs)
  fs.appendFile('.env', "," + addedNodeMultiAddrs[2].toString() + "/p2p/" + stringPeerId, () => {});
}

async function getIDJSON(){
  if (process.env.JSON_ID) {
    // read JSON object from file
    decoded = Buffer.from(process.env.JSON_ID, 'base64').toString()
    jsonID = JSON.parse(decoded);
    const id = await PeerId.createFromJSON(jsonID)
    return id
  } else {
    const id = await PeerId.create({ bits: 2048, keyType: 'RSA' })
    const createID = JSON.stringify(id.toJSON(), null, 2);
    var minified = JSON.stringify(JSON.parse(createID));
    var encoding = Buffer.from(minified).toString('base64')
    fs.appendFile('.env', '\nJSON_ID=' + encoding, () => {});
    fs.appendFile('.env', '\nBOOTSTRAP=', () => {});
    return id
  }
}

;(async () => {
    const id = await getIDJSON()
    const node = await privateLibp2pNode(SWARM_KEY, id)
    node.datastore.open()

    if (!node.isStarted()){
    await Promise.all([
      await node.start(),
      listen(node),
      dial(node)
    // Handle messages for the protocol
    // node.handle('/chat/1.0.0', async ({ stream }) => {
    //   // Send stdin to the stream
    //   stdinToStream(stream)
    //   // Read the stream and output to console
    //   streamToConsole(stream)
    // })
    ])
  }

    // const { stream }= await node.dialProtocol(PeerId.createFromB58String('QmPHJVgwkH4ApF2pPQ4UDCUEzhfM4oJ9hqncmDaawU9coq'), '/chat/1.0.0')
    // // Send stdin to the stream
    // stdinToStream(stream)
    // // Read the stream and output to console
    // streamToConsole(stream)
    console.log(node.multiaddrs)
    //What you need to transport and show via QR code to add people
    // var arrayOf = [multiaddr('/ip4/127.0.0.1/tcp/57336'),multiaddr('/ip4/162.162.93.25/tcp/57336'),multiaddr('/ip4/10.0.0.162/tcp/57336')]
    // var stringPeerId = 'QmPHJVgwkH4ApF2pPQ4UDCUEzhfM4oJ9hqncmDaawU9coq'
    // var peerIDPhone = PeerId.createFromB58String(stringPeerId)
    // addPeerDB(node, peerIDPhone, arrayOf, stringPeerId)
    node.datastore.close()
    // node.stop()

    // rn_bridge.channel.send('Node was initialized.');
  
  })()
