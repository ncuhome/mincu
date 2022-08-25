import { mincu } from 'mincu-react'
import { Bench } from 'tinybench'

export const mincuBench = (times = 10) => {
  const bench = new Bench({ time: times })

  bench.add('handleShowHeader', async () => {
    await mincu.handleShowHeader(true)
    await mincu.handleShowHeader(false)
    await mincu.handleShowHeader(true)
  })

  return bench.run()
}
