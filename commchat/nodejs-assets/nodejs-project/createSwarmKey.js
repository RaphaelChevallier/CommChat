const { generate } = require('libp2p/src/pnet')
const fs = require('fs') 

const swarmKey = new Uint8Array(95)
generate(swarmKey)
console.log("The new SWARM KEY TO MEMORIZE IS: " + swarmKey)

fs.writeFile('.env', 'SWARM_KEY=' + swarmKey, () => {});

