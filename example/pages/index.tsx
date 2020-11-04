import React, { useEffect } from 'react';
import Head from 'next/head';
import { useLogin } from '../lib/hooks/useLogin'
import { useSafeArea } from '../lib/hooks/useSafeArea'
import { useAxiosLoader, ax } from '../lib/hooks/useAxiosLoader'
import { useInfoState } from '../store/index'
import uiModule from '../packages/ui/index'
import eventModule from '../packages/event/index'

const Home = () => {
  const { isReady } = useLogin()
  const { refreshToken } = useAxiosLoader()
  const [studentID, token] = useInfoState(state => [state.studentID, state.token])
  const { top } = useSafeArea()

  useEffect(() => {
    eventModule.setShareConfig({
      title: '应用名',
    })
    hideHeader()
  }, [])

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
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <div style={{ marginTop: top }}>
        <div>学号: {studentID}</div>
        <div>token: ...{token.slice(token.length - 10, token.length)}</div>
        <button onClick={() => fetchSchoolLife()}>测试校园生活是否能成功拉取</button>
        <button onClick={() => refreshToken()}>测试刷新token</button>
        <button onClick={() => hideHeader()}>隐藏标题</button>
        <button onClick={() => showHeader()}>显示标题</button>
        <button onClick={() => eventModule.exit()}>退出</button>
        <button onClick={() => eventModule.showShare()}>分享</button>
        <div>导航</div>
        <button onClick={() => uiModule.toScreen({ screen: '周课表' })}>周课表</button>
        <button onClick={() => uiModule.toScreen({ screen: '用户资料', params: { userId: "5504118086" } })}>他的资料</button>
        <button onClick={() => alert(localStorage.getItem('state'))}>打印缓存</button>
      </div>
    </div>
  )
}

export default Home