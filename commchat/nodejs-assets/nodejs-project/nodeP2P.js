const TCP = require('libp2p-tcp')
const MPLEX = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const Bootstrap = require('libp2p-bootstrap')
const Mdns = require('libp2p-mdns')
const Protector = require('libp2p/src/pnet')
const Gossipsub = require('libp2p-gossipsub')
const swarmKey = require('./createSwarmKey');

// const IPFS = require('ipfs-core')
const Libp2p = require('libp2p')
const SWARM_KEY = swarmKey.SWARM_KEY;

const privateLibp2pNode = async () => {
  const node = await Libp2p.create({
    modules: {
      transport: [TCP],
      streamMuxer: [MPLEX],
      connEncryption: [NOISE],
      peerDiscovery: [Mdns],
      connProtector: new Protector(SWARM_KEY),
      pubsub: Gossipsub
    },
    addresses: {
        listen: [
          '/ip4/0.0.0.0/tcp/9101',
          '/ip4/0.0.0.0/tcp/9102/http/p2p-webrtc-direct'
        ]
      },
      config: {
        peerDiscovery: {
          [Bootstrap.tag]: {
            enabled: true,
            list: bootstrapMultiaddrs, // provide array of multiaddrs
            interval: 2000,
            enabled: true
          }
        },
        pubsub: {                     // The pubsub options (and defaults) can be found in the pubsub router documentation
            enabled: true,
            emitSelf: false
        },
        relay: {                   // Circuit Relay options (this config is part of libp2p core configurations)
            enabled: true,           // Allows you to dial and accept relayed connections. Does not make you a relay.
            autoRelay: {
                enabled: true,         // Allows you to bind to relays with HOP enabled for improving node dialability
                maxListeners: 2         // Configure maximum number of HOP relays to use
            }
        }
      }
  })
  return node
}

// Known peers addresses
const bootstrapMultiaddrs = [
    // '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
    // '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3'
   ]

  module.exports = privateLibp2pNode
