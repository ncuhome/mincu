import React, { cloneElement, useState, useCallback } from 'react'
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions'
import { useThemeDark } from '../hooks/index'

export interface Props {
  open?: boolean
  render: (props: {
    close: () => void
    labelId: string
    descriptionId: string
  }) => React.ReactNode
  children?: JSX.Element
  keepAlive?: boolean
}

const Modal = ({
  render,
  open: passedOpen = false,
  children,
  keepAlive = false,
}: Props) => {
  const [open, setOpen] = useState(passedOpen)

  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: setOpen,
  })

  const isDark = useThemeDark()

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ])

  const Content = useCallback(
    () => (
      <FloatingOverlay
        lockScroll
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <FloatingFocusManager context={context}>
          <div
            {...getFloatingProps({
              ref: floating,
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId,
            })}
          >
            {render({
              close: () => setOpen(false),
              labelId,
              descriptionId,
            })}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    ),
    [isDark]
  )

  return (
    <>
      {children &&
        cloneElement(
          children,
          getReferenceProps({ ref: reference, ...children.props })
        )}
      <FloatingPortal>
        {keepAlive ? (
          <div
            style={{
              visibility: open ? 'visible' : 'hidden',
            }}
          >
            <Content />
          </div>
        ) : (
          open && <Content />
        )}
      </FloatingPortal>
    </>
  )
}

export default Modal
