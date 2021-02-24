const { generate } = require('libp2p/src/pnet')
const fs = require('fs') 

const swarmKey = new Uint8Array(95)
generate(swarmKey)

fs.writeFile('.env', 'SWARM_KEY=' + swarmKey, () => {});

module.exports.SWARM_KEY = swarmKey;

