import execa from 'execa'

export function openUrlSimulator(url: string) {
  try {
    return execa('xcrun', ['simctl', 'openurl', 'booted', url])
  } catch (e) {
    throw e
  }
}
