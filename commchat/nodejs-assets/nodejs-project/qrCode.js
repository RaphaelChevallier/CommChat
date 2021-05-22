var QRCode = require('qrcode')

var opts = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 0.3,
  margin: 1,
  color: {
    dark:"#010599FF",
    light:"#FFBF60FF"
  }
}

function createQRCode (node) {
  var addresses
  node.multiaddrs.forEach((ma) => {
    var address = ma.toString() + '/p2p/' + node.peerId.toB58String()
    addresses = address + "\n"
  })

  QRCode.toDataURL(addresses, opts, function (err, url) {
    if (err) throw err
   
    return url;
  })
}