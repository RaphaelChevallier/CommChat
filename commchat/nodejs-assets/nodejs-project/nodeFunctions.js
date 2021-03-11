// var rn_bridge = require('rn-bridge');
const privateLibp2pNode = require('./nodeP2P')
const PeerId = require('peer-id');
const multiaddr = require('multiaddr')
const fs = require('fs');
require('dotenv').config()
const SWARM_KEY = new Uint8Array(process.env.SWARM_KEY.split(","))

function addPeerDB(node, addedNodePeerID, addedNodeMultiAddrs){
  //this is to start a new db maybe place in own function
  const added = node.peerStore.addressBook.set(addedNodePeerID, addedNodeMultiAddrs)
  // node.datastore.put(addedNodePeerID, addedNodeMultiAddrs)
  // node.datastore.has(addedNodePeerID)
  console.log(added)
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
    return id
  }
}

;(async () => {
    const id = await getIDJSON()
    const node = await privateLibp2pNode(SWARM_KEY, id)
    node.datastore.open()

    await Promise.all([
      node.start()
    ])
  
    console.log(`nodes started... ${node.peerId.toB58String()}`)
    console.log('node multiaddr' + node.multiaddrs)
    console.log('node peerID: ' + node.peerId)
    console.log("dialing")
    const dialed = await node.dial(PeerId.createFromB58String('QmPHJVgwkH4ApF2pPQ4UDCUEzhfM4oJ9hqncmDaawU9coq'))
    console.log("Dialed: " + dialed)
    var arrayOf = [multiaddr('/ip4/127.0.0.1/tcp/57336'),multiaddr('/ip4/100.244.186.88/tcp/57336'),multiaddr('/ip4/192.168.1.70/tcp/57336')]
    var peerIDPhone = PeerId.createFromB58String('bafzbeiaoaalj5bktm6n5z7ilnpaqdefa3ajtr5dmelw3lsk3z2zqmtey7a')
    // addPeerDB(node, peerIDPhone, arrayOf)
    node.datastore.close()
    node.stop()

    // rn_bridge.channel.send('Node was initialized.');
  
  })()
