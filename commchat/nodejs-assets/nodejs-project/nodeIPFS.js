var rn_bridge = require('rn-bridge');
const TCP = require('libp2p-tcp')
const WebRTCDirect = require('libp2p-webrtc-direct')
const MPLEX = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const Mdns = require('libp2p-mdns')


// const IPFS = require('ipfs-core')
const Libp2p = require('libp2p')

const node = await Libp2p.create({
    modules: {
        // Your modules
    }
})

// Known peers addresses
const bootstrapMultiaddrs = [
    // '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
    // '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3'
   ]


const options = {
    modules: {
      transport: [TCP, WebRTCDirect],
      streamMuxer: [MPLEX],
      connEncryption: [NOISE],
      peerDiscovery: [Mdns],
      pubsub: Gossipsub
    },
    addresses: {
        listen: [
          '/ip4/6.3.5.3/tcp/8000/ws',
          '/ip4/6.3.5.3/tcp/9090/http/p2p-webrtc-direct'
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
            emitSelf: false,                                  // whether the node should emit to self on publish
            globalSignaturePolicy: SignaturePolicy.StrictSign // message signing policy
        },
        relay: {                   // Circuit Relay options (this config is part of libp2p core configurations)
            enabled: true,           // Allows you to dial and accept relayed connections. Does not make you a relay.
            autoRelay: {
                enabled: true,         // Allows you to bind to relays with HOP enabled for improving node dialability
                maxListeners: 2         // Configure maximum number of HOP relays to use
            }
        }
      },
  }