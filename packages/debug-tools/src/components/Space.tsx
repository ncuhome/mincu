import { FC } from 'react'

interface Props {
  /**
   * @default 4
   */
  x?: number | string
  /**
   * @default 4
   */
  y?: number | string
  direction?: 'row' | 'column'
}

const Space: FC<Props> = ({ x = 4, y = 4, direction = 'column' }) => {
  return (
    <span
      style={{
        display: direction === 'row' ? 'inline-block' : undefined,
        margin: `${y}px ${x}px`,
      }}
    />
  )
}

export default Space
