import { EventEmitter } from 'events'

export const channelGenerater = (eventMap: object) => {
  if (typeof window === 'undefined') return
  
  window.RNMessageChannel = new EventEmitter()

  window.RNMessageChannel.on('call', (message) => {
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