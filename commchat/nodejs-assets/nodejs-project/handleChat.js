const { stdinToStream, streamToConsole } = require('./stream')

async function handleChat(node) {
    // Handle messages for the protocol
    await node.handle('/chat/phone', async ({ stream }) => {
      // Send stdin to the stream
      stdinToStream(stream)
      // Read the stream and output to console
      streamToConsole(stream)
    })
  }

  module.exports = {
      handleChat
  }