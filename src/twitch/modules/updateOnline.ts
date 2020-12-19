import twitch from '..'

const bootstrap = async () => {
  setTimeout(() => bootstrap(), 5 * 60 * 1000)
  const channels = twitch.channels
  const streams = await twitch.bot.api.helix.streams.getStreams({ userId: channels.map(c => c.id) })

  for (const stream of streams.data) {
    const channel = channels.find(c => c.id === stream.userId)
    channel.online = true
    channel.save()
  }

  for (const channel of channels.filter(channel => !streams.data.find(stream => stream.userId === channel.id))) {
    channel.online = false
    channel.save()
  }
}

bootstrap()
