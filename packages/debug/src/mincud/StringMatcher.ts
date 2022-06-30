import debounce from 'lodash.debounce'

/**
 * 用以匹配来自类似于 Readable 的持续输出的字符串流。
 * 当目标匹配内容可能出现在某段序列的字符流并且通常是在比较靠后的位置时，需要聚合整段序列再进行匹配。
 * 比如，当我想要匹配子进程 stdout 中运行的 dev server 的地址时，其打印顺序通常是先 Local host，
 * 然后才是 Network host，在这种情况会有优先匹配 Network host 的需求，需要聚合序列再进行判断。
 * 在每次以 cycle 为周期的过程中只会将此周期的结果聚合并检查是否匹配，匹配成功后，将会调用 onMatch 的 callback 函数。
 * 匹配优先级顺序与 regexExps 数组的顺序相同。
 * once 为 true 时，只会匹配一次，否则会一直匹配。
 */
export class StringMatcher {
  queue: string[]
  private cycle: number
  private regexExps: RegExp[]
  private once: boolean
  private matchCallbacks: ((matchResult: string[]) => void)[]
  private debouncedCheck: () => void
  private idx: number

  constructor(regexExps: RegExp[], { cycle = 3, debounceDelay = 1000, once = true } = {}) {
    this.queue = []
    this.cycle = cycle
    this.regexExps = regexExps
    this.matchCallbacks = []
    this.once = once
    this.debouncedCheck = debounce(this.check, debounceDelay)
    this.idx = 0
  }

  put(text: string) {
    if (this.matchCallbacks.length === 0) return

    if (this.queue.length === this.cycle) {
      this.queue[this.idx++] = text
      this.check()
      if (this.idx >= this.cycle) this.idx = 0
    } else if (this.queue.length < this.cycle) {
      this.queue.push(text)
      if (this.queue.length === this.cycle) this.check()
    }

    this.debouncedCheck()
  }

  onMatch(cb: (matchResult: string[]) => void) {
    this.matchCallbacks.push(cb)
  }

  private check() {
    const wholeStr = this.queue.join(' ')
    for (const regex of this.regexExps) {
      const matchRes = wholeStr.match(regex)
      if (matchRes?.length > 0) {
        this.matchCallbacks.forEach((cb) => cb(matchRes))
        if (this.once) {
          this.matchCallbacks = []
        }
        break
      }
    }
  }
}
