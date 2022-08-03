import React, { Fragment, useEffect, useState } from 'react'
import Debuggable from './components/Debuggable'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Allotment } from 'allotment'
import SimpleBarReact from 'simplebar-react'

import Space from '@/components/Space'
import Inspector from '@/components/Inspector'
import { useThemeWatcher, useTargets, useIp } from '@/hooks'
import clsx from 'clsx'
import CopyableScript from './components/CopyableScript'
import { DebugTarget } from '@/shim'
import { CHII_EVENT } from 'mincu-lib/debug'

export const App = () => {
  const { targets, mutate: mutateTargets } = useTargets()
  const { ip } = useIp()
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [currentTarget, setCurrentTarget] = useState<DebugTarget>()

  useThemeWatcher()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:2333')
    ws.onmessage = async ({ data }) => {
      try {
        const { type, payload } = JSON.parse(data)
        console.log('TYPE', type)
        if (
          type === CHII_EVENT.TARGET_CHANGED ||
          type === CHII_EVENT.CONNECTED
        ) {
          mutateTargets(payload)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  useEffect(() => {
    if (currentTarget) {
      const valid = targets.some((it) => it.id === currentTarget.id)
      if (!valid) {
        setCurrentTarget(undefined)
      }
    }
  }, [targets])

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
          <Allotment>
            <Allotment.Pane minSize={200} preferredSize={400}>
              <SimpleBarReact
                style={{ maxHeight: '100%' }}
                className="flex flex-col py-12 px-6 w-full h-full"
              >
                {targets.map((target) => (
                  <Fragment key={target.id}>
                    <Debuggable
                      data={target}
                      onClick={() => setCurrentTarget(target)}
                      active={target.id === currentTarget?.id}
                    />
                    <Space />
                  </Fragment>
                ))}
              </SimpleBarReact>
            </Allotment.Pane>
            <div className="w-full h-full">
              {currentTarget ? (
                <Inspector data={currentTarget} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-xl">
                  🍺 从左侧选择要调试的应用
                </div>
              )}
            </div>
          </Allotment>
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
