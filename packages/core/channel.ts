import { EventEmitter } from 'events'
import { _window } from '@lib/utils'

type Message = {
  key: number
  status: 'success' | 'failed'
  data: any
}

export type EventMap = {
  [key: number]: {
    success: any
    failed: any
  }
}

export const channelGenerator = (eventMap: EventMap) => {
  if (_window === 'undefined') return

  _window.RNMessageChannel = new EventEmitter()

  // 设置接受发送到客户端方法所返回的数值的监听器
  _window.RNMessageChannel.on('call', (message: Message) => {
    const { key, status, data } = message ?? {}

    const { success, failed } = eventMap[key]

    if (status === 'success') {
      success(data)
    } else {
      failed(data)
    }
  })
}
