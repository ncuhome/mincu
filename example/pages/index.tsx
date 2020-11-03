import React from 'react';
import { useLogin } from '../lib/hooks/useLogin'

const App = () => {
  useLogin()

  return (
    <div>
      <div>加载中</div>
    </div>
  )
}

export default App;