const TCP = require('libp2p-tcp')
const Libp2p = require('libp2p')
const MPLEX = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const Bootstrap = require('libp2p-bootstrap')
const Mdns = require('libp2p-mdns')
const Protector = require('libp2p/src/pnet')
const Gossipsub = require('libp2p-gossipsub')
const LevelStore = require('datastore-level')
const store = new LevelStore('./mydb')
store.open()

// Known peers addresses
const bootstrapMultiaddrs = [
  // '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
  // '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3'
 ]

const privateLibp2pNode = async (swarmKey, peerID) => {
  const node = await Libp2p.create({
    modules: {
      transport: [TCP],
      streamMuxer: [MPLEX],
      connEncryption: [NOISE],
      peerDiscovery: [],
      connProtector: new Protector(swarmKey),
      pubsub: Gossipsub
    },
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/57336',
        '/ip4/0.0.0.0/tcp/57326/http/p2p-webrtc-direct'
      ]
      },
    datastore: store,
    peerStore: {
      persistence: true,
      threshold: 5
    },
    peerId: peerID,
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

  module.exports = privateLibp2pNode
