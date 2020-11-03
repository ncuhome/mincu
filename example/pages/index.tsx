import React from 'react';
import Head from 'next/head';
import { useLogin } from '../lib/hooks/useLogin'
import { useAxiosLoader, ax } from '../lib/hooks/useAxiosLoader'
import { useInfoState } from '../store/index'
import uiModule from '../packages/ui/index'
import eventModule from '../packages/event/index'

const Home = () => {
  const { isReady } = useLogin()
  const { refreshToken } = useAxiosLoader()
  const [studentID, token] = useInfoState(state => [state.studentID, state.token])

  const fetchSchoolLife = async () => {
    const { status } = await ax.get('https://incu-api.ncuos.com/v2/api/schoolLife')

    alert(status)
  }

  const hideHeader = () => {
    uiModule.handleShowHeader(false)
  }

  const showHeader = () => {
    uiModule.handleShowHeader(true)
  }

  if (!isReady) {
    return (
      <div>
        加载中
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>测试页面</title>
      </Head>
      <div>学号: {studentID}</div>
      <div>token: {token}</div>
      <button onClick={() => fetchSchoolLife()}>测试校园生活是否能成功拉取</button>
      <button onClick={() => refreshToken()}>测试刷新token</button>
      <button onClick={() => hideHeader()}>隐藏标题</button>
      <button onClick={() => showHeader()}>显示标题</button>
      <button onClick={() => eventModule.exit()}>退出</button>
    </div>
  )
}

export default Home