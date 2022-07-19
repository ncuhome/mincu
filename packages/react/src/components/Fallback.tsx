import React from 'react'

export const Fallback = () => (
  <div
    style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 18,
    }}
  >
    <span>
      请在
      <a
        href="http://incu.ncuos.com/"
        target="__blank"
        style={{
          color: '#57D640',
          margin: 2,
        }}
      >
        南大家园
      </a>
      中打开😊
    </span>
  </div>
)
