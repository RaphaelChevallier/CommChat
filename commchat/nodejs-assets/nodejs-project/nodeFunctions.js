// var rn_bridge = require('rn-bridge');
const privateLibp2pNode = require('./nodeP2P')
const PeerId = require('peer-id');
const fs = require('fs');
const LevelStore = require('datastore-level')
const store = new LevelStore('./mydb')
require('dotenv').config()
const SWARM_KEY = new Uint8Array(process.env.SWARM_KEY.split(","))
store.close()

function addPeerDB(node, addedNodePeerID, addedNodeMultiAddrs){
  store.open() //this is to start a new db maybe place in own function
  node.peerStore.add(addedNodePeerID, addedNodeMultiAddrs)
  store.close()
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
  
    await Promise.all([
      node.start()
    ])
  
    console.log(`nodes started... ${node.peerId.toB58String()}`)
    console.log('nodes started...' + node.multiaddrs)
    console.log("dialing")
    // node.peerStore.addressBook.set(node2.peerId, node2.multiaddrs)
    // const dialed = await node.dial('/ip4/192.168.1.81/tcp/57336/p2p/QmPHJVgwkH4ApF2pPQ4UDCUEzhfM4oJ9hqncmDaawU9coq')
    // console.log("Dialed: " + dialed)
    // rn_bridge.channel.send('Node was initialized.');
  
  })()
