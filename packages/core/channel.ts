import { EventEmitter } from 'events'

export const channelGenerater = (eventMap: object) => {
  const channel = new EventEmitter()

  channel.on('call', (message) => {
    const {
      key,
      status,
      data
    } = message || {}

    const {
      success,
      failed
    } = eventMap[key]

    if (status === 'success') {
      success(data)
    } else {
      failed(data)
    }
  })
}