import 'react-mosaic-component/react-mosaic-component.css'
import './mosaic.css'

import React, { useEffect } from 'react'
import Debuggable from './components/Debuggable'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Mosaic } from 'react-mosaic-component'

import { useThemeWatcher } from './hooks'
import { useTargets, useIp } from './hooks/request'
import clsx from 'clsx'
import CopyableScript from './components/CopyableScript'

const DebugArea = () => {
  const { targets, mutate: mutateTargets } = useTargets({
    refreshInterval: 1000,
  })
  const { ip } = useIp()
  const [parent] = useAutoAnimate<HTMLDivElement>()

  useThemeWatcher()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:2333')
    ws.onmessage = async ({ data }) => {
      console.log(data)
      try {
        const { type, payload } = JSON.parse(data)
        if (type === 'targchiiConnected') {
          mutateTargets(payload)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  return (
    <div
      ref={parent}
      className={clsx(
        'dark:text-white dark:bg-zinc-900',
        'overflow-hidden items-center justify-center',
        'w-screen h-screen flex flex-col'
      )}
    >
      {targets.length > 0 ? (
        <>
          <div className="text-2xl mb-12">可调试应用</div>
          {targets.map((target) => (
            <Debuggable key={target.id} data={target} />
          ))}
        </>
      ) : (
        <div className="text-2xl flex flex-col items-center justify-center">
          无可调试应用
          <CopyableScript ip={ip} />
        </div>
      )}
    </div>
  )
}
const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  a: <DebugArea />,
  b: <div>Top Right</div>,
  c: <div>Bottom Right Window</div>,
}

const Window = () => {
  return (
    <Mosaic<string>
      renderTile={(id) => {
        return ELEMENT_MAP[id]
      }}
      initialValue={{
        direction: 'row',
        first: 'a',
        second: {
          direction: 'column',
          first: 'b',
          second: 'c',
        },
        splitPercentage: 60,
      }}
    />
  )
}

export const App = () => {
  return (
    <DebugArea />
    // <div className="max-w-screen h-screen">
    //   <Window />
    // </div>
  )
}
