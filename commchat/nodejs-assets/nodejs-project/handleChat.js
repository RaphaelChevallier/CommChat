const { stdinToStream, streamToConsole } = require('./stream')
const { dial } = require('./dialerFunctions')

async function handleChat(node) {
    // Handle messages for the protocol
    await node.handle('/chat/linux', async ({ stream }) => {
      // // Send stdin to the stream
      // stdinToStream(stream)
      // Read the stream and output to console
      streamToConsole(stream)
      dial(node, '/chat/laptop')
    })
  }

  module.exports = {
      handleChat
  }