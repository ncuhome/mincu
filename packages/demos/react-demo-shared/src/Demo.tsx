import React, { useEffect } from 'react'
import { Button } from './Button'
import { useSafeArea, useNativeState, mincu } from 'mincu-react'
import axios from 'axios'
import { tw } from 'twind'
import { mincuBench } from './mincu-bench'

const fetcher = axios.create()
mincu.useAxiosInterceptors(fetcher)

export const Demo: React.FC = () => {
  const { top } = useSafeArea()
  const colors = useNativeState('colors')
  const colorScheme = useNativeState('colorScheme')

  useEffect(() => {
    mincu.setShareConfig({
      title: '应用名',
    })
    hideHeader()
  }, [])

  useEffect(() => {
    document.body.style.background = colorScheme === 'dark' ? '#222' : '#fff'
    document.body.style.color = colorScheme === 'dark' ? '#fff' : '#000'
  }, [colorScheme])

  const fetchSchoolLife = async () => {
    const loadingTip = await mincu.toast.loading('加载中', 0)
    try {
      const res = await fetcher.get(
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
    mincu.handleShowHeader(false)
  }

  const showHeader = () => {
    mincu.handleShowHeader(true)
  }

  const showVersion = async () => {
    const version = await mincu.getVersion()
    alert(version)
  }

  const toastLoading = async () => {
    await mincu.toast.loading('加载中')
  }

  const refreshToken = async () => {
    const token = await mincu.refreshToken()
    alert(token)
  }

  const backPressCb = () => mincu.toast.success('onBackPress 回调触发', 1)

  const ColorItem = ({ name, color }: any) => (
    <div
      className={tw(
        'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-3'
      )}
      style={{
        color,
        marginBottom: 12,
      }}
    >
      {name}
    </div>
  )

  const storageTests = {
    get: () => {
      mincu.storage
        .getItem('test')
        .then((res) => {
          mincu.toast.success(res)
        })
        .catch((err) => {
          mincu.toast.fail(err)
        })
    },
    set: () => {
      mincu.storage
        .setItem('test', new Date().toLocaleString())
        .then(() => {
          mincu.toast.success('set success')
        })
        .catch((err) => {
          mincu.toast.fail(err)
        })
    },
    remove: () => {
      mincu.storage
        .removeItem('test')
        .then(() => {
          mincu.toast.success('remove success')
        })
        .catch((err) => {
          mincu.toast.fail(err)
        })
    },
    reset: () => {
      mincu.storage
        .reset()
        .then(() => {
          mincu.toast.success('reset success')
        })
        .catch((err) => {
          mincu.toast.fail(err)
        })
    },
  }

  const startBench = async () => {
    const bench = await mincuBench()
    alert(JSON.stringify(bench[0].result, null, 2))
  }

  return (
    <div>
      <div style={{ marginTop: top + 12, marginRight: 10, marginLeft: 10 }}>
        <p className={tw('font-medium text-xl m-2')}>
          学号: {mincu.appData.user.profile.entireProfile.base_info.xh}
        </p>
        <Button onClick={fetchSchoolLife}>测试云家园接口是否能成功拉取</Button>
        <Button onClick={refreshToken}>测试刷新token</Button>
        <Button onClick={hideHeader}>隐藏标题</Button>
        <Button onClick={showHeader}>显示标题</Button>
        <Button onClick={() => mincu.exit()}>退出</Button>
        <Button onClick={() => mincu.showShare()}>分享</Button>
        <p className={tw('font-medium text-xl m-2')}>UI 相关</p>
        <Button onClick={() => mincu.toScreen({ screen: '周课表' })}>
          周课表
        </Button>
        <Button
          onClick={() =>
            mincu.toScreen({
              screen: '用户资料',
              params: { userId: '5504118086' },
            })
          }
        >
          他的资料
        </Button>
        <Button onClick={() => mincu.toast.info('23333')}>
          打开 Toast info
        </Button>
        <Button onClick={() => mincu.toast.success('23333')}>
          打开 Toast success
        </Button>
        <Button onClick={toastLoading}>打开 Toast loading</Button>
        <Button onClick={showVersion}>获取版本号</Button>
        <Button onClick={() => alert(colorScheme)}>获取当前主题</Button>
        <Button
          onClick={() =>
            mincu.backPress.bind(backPressCb, (success) => {
              if (success) {
                mincu.toast.success(
                  '绑定原生返回事件成功，请自行处理返回事件',
                  1
                )
              } else {
                mincu.toast.fail('绑定原生返回事件失败， 请先显示 header', 1)
              }
            })
          }
        >
          绑定原生返回事件
        </Button>
        <Button
          onClick={() => {
            mincu.backPress.unbind(backPressCb)
            mincu.toast.success('取消绑定原生返回事件', 1)
          }}
        >
          取消绑定原生返回事件
        </Button>
        <Button onClick={() => mincu.login('username', 'pwd')}>登录</Button>
        <Button onClick={() => mincu.orientation.lockToLandscape()}>
          切换横屏
        </Button>
        <Button onClick={() => mincu.orientation.lockToPortrait()}>
          切换竖屏
        </Button>

        <p className={tw('font-medium text-xl m-2')}>Benckmark</p>
        <Button onClick={startBench}>mincu.handleShowHeader x 30</Button>

        <p className={tw('font-medium text-xl m-2')}>colors 测试</p>
        <ColorItem color={colors.white} name="colors.white" />
        <ColorItem color={colors.black} name="colors.white" />

        <p className={tw('font-medium text-xl m-2')}>MincuStorage 测试</p>
        <Button onClick={storageTests.get}>getItem('test')</Button>
        <Button onClick={storageTests.set}>
          setItem('test', new Date().toLocaleString())
        </Button>
        <Button onClick={storageTests.remove}>removeItem('test')</Button>
        <Button onClick={storageTests.reset}>reset()</Button>
      </div>
    </div>
  )
}
