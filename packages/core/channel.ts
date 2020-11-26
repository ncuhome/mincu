import { EventEmitter } from 'events'
import { _window } from '../../lib/utils'

export const channelGenerator = (eventMap: object) => {
  if (_window === 'undefined') return
  
  _window.RNMessageChannel = new EventEmitter()

  _window.RNMessageChannel.on('call', (message) => {
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