import { CHII_URL } from '@/utils'
import React, { FC } from 'react'
import useClipboard from 'react-use-clipboard'
import Space from './Space'

const targetSrc = (host = 'localhost') => `${CHII_URL}/target.js`

const CodePart = ({ src }: { src: string }) => {
  const script = `<script src="${src}"></script>`
  const [isCopied, setCopied] = useClipboard(script, {
    successDuration: 2000,
  })
  return (
    <>
      <code>
        <span style={{ color: '#81A1C1' }}>&lt;script</span>
        <span style={{ color: '#D8DEE9FF' }}> </span>
        <span style={{ color: '#8FBCBB' }}>src</span>
        <span style={{ color: '#ECEFF4' }}>=</span>
        <span style={{ color: '#ECEFF4' }}>"</span>
        <span style={{ color: '#A3BE8C' }}>{src}</span>
        <span style={{ color: '#ECEFF4' }}>"</span>
        <span style={{ color: '#81A1C1' }}>&gt;&lt;/script&gt;</span>
      </code>
      <Space direction="row" />
      <button
        className="transition active:scale-80 hover:scale-110 text-xl"
        onClick={setCopied}
      >
        {isCopied ? (
          <div className="i-mdi-check color-green-5" />
        ) : (
          <div className="i-mdi-content-copy" />
        )}
      </button>
    </>
  )
}
const CopyableScript: FC<{
  ip: string
}> = ({ ip }) => {
  const src = targetSrc(ip)
  return (
    <>
      <Space y={8} />
      <pre className="text-center py-2 px-6 border-2 rounded-lg text-lg">
        <div>将 script 插入到你的页面</div>
        <CodePart src={src} />
      </pre>
    </>
  )
}

export default CopyableScript
