// var rn_bridge = require('rn-bridge');
const privateLibp2pNode = require('./nodeP2P')

;(async () => {
    const node = await privateLibp2pNode()

  
    await Promise.all([
      node.start()
    ])
  
    console.log('nodes started...')
    // rn_bridge.channel.send('Node was initialized.');
  
  })()
