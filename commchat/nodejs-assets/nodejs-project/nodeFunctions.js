// var rn_bridge = require('rn-bridge');
const privateLibp2pNode = require('./nodeP2P')

;(async () => {
    const node = await privateLibp2pNode()
  
    await Promise.all([
      node.start(),
    ])
  
    console.log(`nodes started... ${node.peerId.toB58String()}`)
    console.log('nodes started...' + node.multiaddrs.toString())
    await node.dial("/ip4/206.87.216.255/tcp/9101/p2p/" + "bafzbeicrafey4t2qj2pgusgm2a5kt2rsfcraoaj3wnffnpaibvof6ts5gy".toB58String())
    // rn_bridge.channel.send('Node was initialized.');
  
  })()
