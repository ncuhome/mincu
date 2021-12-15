import React, { useEffect } from 'react'
import Head from 'next/head'
import Loading from '../components/loading'
import { useLogin } from '../lib/hooks/useLogin'
import { useSafeArea } from '../lib/hooks/useSafeArea'
import { useInfoState } from '../store/index'
import { dataModule, eventModule, uiModule, networkModule, useNativeState } from 'mincu-react'

const Index = () => {
  const { isReady } = useLogin()
  const { top } = useSafeArea()

  const studentID = useInfoState((state) => state.studentID)
  const colors = useNativeState('colors')
  const colorScheme = useNativeState('colorScheme')

  useEffect(() => {
    networkModule.getStoredToken()
  }, [])

  useEffect(() => {
    eventModule.setShareConfig({
      title: '应用名',
    })
    hideHeader()
  }, [])

  const fetchSchoolLife = async () => {
    const loadingTip = await uiModule.loading('加载中', 0)
    try {
      const res = await networkModule.fetch.get(
        'https://os.ncuos.com/api/user/profile/basic'
      )
      alert(JSON.stringify(res.data))
    } catch (e) {
      alert(e)
    } finally {
      loadingTip()
    }
  }

  const hideHeader = () => {
    uiModule.handleShowHeader(false)
  }

  const showHeader = () => {
    uiModule.handleShowHeader(true)
  }

  const showVersion = async () => {
    const version = await dataModule.getVersion()
    alert(version)
  }

  const toastLoading = async () => {
    await uiModule.loading('加载中')
  }

  const refreshToken = async () => {
    const token = await networkModule.refreshToken()
    alert(token)
  }

  if (!isReady) {
    return <Loading />
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
      <div style={{ marginTop: top, marginRight: 10, marginLeft: 10 }}>
        <div>学号: {studentID}</div>
        <button onClick={fetchSchoolLife}>测试云家园接口是否能成功拉取</button>
        <button onClick={refreshToken}>测试刷新token</button>
        <button onClick={hideHeader}>隐藏标题</button>
        <button onClick={showHeader}>显示标题</button>
        <button onClick={() => uiModule.exit()}>退出</button>
        <button onClick={() => eventModule.showShare()}>分享</button>
        <div>导航</div>
        <button onClick={() => uiModule.toScreen({ screen: '周课表' })}>周课表</button>
        <button
          onClick={() =>
            uiModule.toScreen({ screen: '用户资料', params: { userId: '5504118086' } })
          }
        >
          他的资料
        </button>
        <button onClick={() => alert(localStorage.getItem('state'))}>打印缓存</button>
        <button onClick={() => uiModule.info('23333')}>打开 Toast info</button>
        <button onClick={() => uiModule.success('23333')}>打开 Toast success</button>
        <button onClick={toastLoading}>打开 Toast loading</button>
        <button onClick={showVersion}>获取版本号</button>
        <button onClick={() => alert(colorScheme)}>获取当前主题</button>

        <div> colors 测试 </div>
        <div
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: colors.white,
            border: '1px solid #2e2e2e',
            borderRadius: 7,
          }}
        ></div>

        <button onClick={() => eventModule.login('username', 'pwd')}>登录</button>
      </div>
    </div>
  )
}

export default Index
