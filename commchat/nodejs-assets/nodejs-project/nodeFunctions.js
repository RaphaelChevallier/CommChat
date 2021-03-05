// var rn_bridge = require('rn-bridge');
const privateLibp2pNode = require('./nodeP2P')
const PeerId = require('peer-id');
const fs = require('fs');
require('dotenv').config()
const SWARM_KEY = new Uint8Array(process.env.SWARM_KEY.split(","))

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
    console.log('nodes started...' + node.multiaddrs.toString())
    console.log("dialing")
    // const dialed = await node.dial(node2.peerId)
    // console.log("Dialed: " + dialed)
    // rn_bridge.channel.send('Node was initialized.');
  
  })()
