const TCP = require('libp2p-tcp')
const Libp2p = require('libp2p')
const MPLEX = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const Bootstrap = require('libp2p-bootstrap')
const Protector = require('libp2p/src/pnet')
const MDNS = require('libp2p-mdns')
const KadDht = require('libp2p-kad-dht')
const Gossipsub = require('libp2p-gossipsub')
const LevelStore = require('datastore-level')
require('dotenv').config()
const bootstrapMultiaddrs = process.env.BOOTSTRAP.split(",")|| []

const privateLibp2pNode = async (swarmKey, peerID) => {
  const node = await Libp2p.create({
    modules: {
      transport: [TCP],
      streamMuxer: [MPLEX],
      connEncryption: [NOISE],
      peerDiscovery: [Bootstrap, MDNS],
      dht: KadDht,
      peerRouting: KadDht,
      contentRouting: KadDht,
      connProtector: new Protector(swarmKey),
      pubsub: Gossipsub
    },
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/57336',
        // '/ip4/0.0.0.0/tcp/57326/http/p2p-webrtc-direct'
      ]
      },
    datastore: new LevelStore('./mydb'),
    peerStore: {
      persistence: true,
      threshold: 1
    },
    peerId: peerID,
    connectionManager: {
      maxConnections: 300,
      minConnections: 0,
      pollInterval: 2000,
      defaultPeerValue: 1,
    },
    peerRouting: {
      refreshManager: {
        enabled: true,
        interval: 1.5e6,
        bootDelay: 10e3,
      }
    },
    config: {
      peerDiscovery: {
        autoDial: true,
        [MDNS.tag]: {
          interval: 10000,
          enabled: true
        },
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
          enabled: true,
          hop: {
            enabled: true,         // Allows you to be a relay for other peers
            active: true           // You will attempt to dial destination peers if you are not connected to them
          },           // Allows you to dial and accept relayed connections. Does not make you a relay.
          autoRelay: {
              enabled: true,         // Allows you to bind to relays with HOP enabled for improving node dialability
              maxListeners: 3         // Configure maximum number of HOP relays to use
          }
      },
    }
  })
  return node
}

module.exports = privateLibp2pNode
