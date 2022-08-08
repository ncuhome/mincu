<script setup lang="ts">
import { mincu } from 'mincu-vanilla'
import Button from './components/Button.vue';
import useNativeState from './hooks/useNativeState'
import { watch } from 'vue';


const colorScheme = useNativeState('colorScheme')
const colors = useNativeState('colors', '')

watch(colorScheme, (newVal) => {
  document.body.style.background = newVal === 'dark' ? '#222' : '#fff'
  document.body.style.color = newVal === 'dark' ? '#fff' : '#000'
})

mincu.getStoredToken()
mincu.setShareConfig({
  title: 'vue-vite example',
})

const studentId = mincu.userInfo.profile.entireProfile.base_info.xh

const fetchSchoolLife = () => {
  alert(1)
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

const showColorScheme = () => {
  alert(colorScheme.value)
}

const backPress = {
  cb: () => mincu.toast.success('onBackPress 回调触发', 1),
  bind: () => {
    mincu.backPress.bind(backPress.cb, (success) => {
      if (success) {
        mincu.toast.success(
          '绑定原生返回事件成功，请自行处理返回事件',
          1
        )
      } else {
        mincu.toast.fail('绑定原生返回事件失败， 请先显示 header', 1)
      }
    })
  },
  unbind: () => {
    mincu.backPress.unbind(backPress.cb)
    mincu.toast.success(
      '取消绑定原生返回事件',
      1
    )
  }
}


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

</script>

<template>
  <div style="margin-left: 10px; margin-right: 10px; margin-top: 10px; padding-bottom: 10px;">
    <div>
      <p className="font-medium text-xl m-2">
        学号: {{ studentId }}
      </p>
      <p className="font-medium text-xl m-2">
        主题色: {{ colorScheme }}
      </p>
      <Button :onClick="fetchSchoolLife">
        测试云家园接口是否能成功拉取
      </Button>
      <Button :onClick="refreshToken">测试刷新token</Button>
      <Button :onClick="hideHeader">隐藏标题</Button>
      <Button :onClick="showHeader">显示标题</Button>
      <Button :onClick="() => mincu.exit()">退出</Button>
      <Button :onClick="() => mincu.showShare()">分享</Button>
      <p className="font-medium text-xl m-2">导航</p>
      <Button :onClick="() => mincu.toScreen({ screen: '周课表' })">
        周课表
      </Button>
      <Button :onClick="() =>
        mincu.toScreen({
          screen: '用户资料',
          params: { userId: '5504118086' },
        })
      ">
        他的资料
      </Button>
      <Button :onClick="() => mincu.toast.info('23333')">
        打开 Toast info
      </Button>
      <Button :onClick="() => mincu.toast.success('23333')">
        打开 Toast success
      </Button>
      <Button :onClick="toastLoading">打开 Toast loading</Button>
      <Button :onClick="showVersion">获取版本号</Button>
      <Button :onClick="showColorScheme">获取当前主题</Button>
      <Button :onClick="backPress.bind">
        绑定原生返回事件
      </Button>
      <Button :onClick="backPress.unbind">
        取消绑定原生返回事件
      </Button>

      <Button :onClick="() => mincu.login('username', 'pwd')">
        登录
      </Button>

      <p className="font-medium text-xl m-2">colors 测试</p>
      <div
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-3"
        :style="{ color: colors.white }">
        colors.white
      </div>
      <div
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-3"
        :style="{ color: colors.black }">
        colors.black
      </div>

      <p className="font-medium text-xl m-2">MincuStorage 测试</p>
      <Button :onClick="storageTests.get">getItem('test')</Button>
      <Button :onClick="storageTests.set">
        setItem('test', new Date().toLocaleString())
      </Button>
      <Button :onClick="storageTests.remove">removeItem('test')</Button>
      <Button :onClick="storageTests.reset">reset()</Button>
    </div>
  </div>
</template>
