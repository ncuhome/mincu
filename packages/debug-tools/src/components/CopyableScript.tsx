import { CHII_URL } from '@/utils'
import React, { FC } from 'react'
import useClipboard from 'react-use-clipboard'
import Space from './Space'

const targetSrc = (host = 'localhost') => `${CHII_URL}/target.js`

const ScriptPart = ({ src }: { src: string }) => {
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

const ImportDebugPart = ({ src }: { src: string }) => {
  const script = `import debug from 'mincu-debug';\ndebug.connect();`
  const [isCopied, setCopied] = useClipboard(script, {
    successDuration: 2000,
  })
  return (
    <>
      <code>
        <span className="line">
          <span style={{ color: '#81A1C1' }}>import</span>
          <span style={{ color: '#D8DEE9FF' }}> </span>
          <span style={{ color: '#8FBCBB' }}>debug</span>
          <span style={{ color: '#D8DEE9FF' }}> </span>
          <span style={{ color: '#81A1C1' }}>from</span>
          <span style={{ color: '#D8DEE9FF' }}> </span>
          <span style={{ color: '#ECEFF4' }}>'</span>
          <span style={{ color: '#A3BE8C' }}>mincu-debug</span>
          <span style={{ color: '#ECEFF4' }}>'</span>
          <span style={{ color: '#81A1C1' }}>;</span>
        </span>
        {'\n'}
        <span className="line">
          <span style={{ color: '#D8DEE9' }}>debug</span>
          <span style={{ color: '#ECEFF4' }}>.</span>
          <span style={{ color: '#88C0D0' }}>connect</span>
          <span style={{ color: '#D8DEE9FF' }}>()</span>
          <span style={{ color: '#81A1C1' }}>;</span>
        </span>
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
      <pre className="text-center py-2 px-6 border-2 rounded-lg text-lg w-full">
        <div>将 script 插入到你的页面</div>
        <ScriptPart src={src} />
      </pre>
      <Space y={8} />
      <pre className="text-center py-2 px-6 border-2 rounded-lg text-lg w-full">
        <div>使用 mincu-debug 引入</div>
        <ImportDebugPart src={src} />
      </pre>
      <Space y={4} />
      <div className="text-lg">
        🐛 或者打开演示页面{' '}
        <a
          href={`${CHII_URL}/test/demo.html`}
          target="__blank"
          className="color-blue"
        >
          {CHII_URL}/test/demo.html
        </a>
      </div>
    </>
  )
}

export default CopyableScript
