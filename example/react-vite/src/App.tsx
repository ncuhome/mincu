import React, { useEffect } from 'react';
import {
  useSafeArea,
  dataModule,
  eventModule,
  uiModule,
  networkModule,
  useNativeState,
  Ready,
} from 'mincu-react';
import { Fallback } from './Fallback';
import { Button } from './Button';

const App = () => {
  const { top } = useSafeArea();
  const colors = useNativeState('colors');
  const colorScheme = useNativeState('colorScheme');

  useEffect(() => {
    networkModule.getStoredToken();
  }, []);

  useEffect(() => {
    eventModule.setShareConfig({
      title: '应用名',
    });
    hideHeader();
  }, []);

  useEffect(() => {
    document.body.style.background = colorScheme === 'dark' ? '#222' : '#fff';
    document.body.style.color = colorScheme === 'dark' ? '#fff' : '#000';
  }, [colorScheme]);

  const fetchSchoolLife = async () => {
    const loadingTip = await uiModule.loading('加载中', 0);
    try {
      const res = await networkModule.fetch.get(
        'https://os.ncuos.com/api/user/profile/basic'
      );
      alert(JSON.stringify(res.data));
    } catch (e) {
      alert(e);
    } finally {
      loadingTip();
    }
  };

  const hideHeader = () => {
    uiModule.handleShowHeader(false);
  };

  const showHeader = () => {
    uiModule.handleShowHeader(true);
  };

  const showVersion = async () => {
    const version = await dataModule.getVersion();
    alert(version);
  };

  const toastLoading = async () => {
    await uiModule.loading('加载中');
  };

  const refreshToken = async () => {
    const token = await networkModule.refreshToken();
    alert(token);
  };

  const backPressCb = () => uiModule.success('onBackPress 回调触发', 1);

  const ColorItem = ({ name, color }: any) => (
    <div
      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-3"
      style={{
        color,
      }}
    >
      {name}
    </div>
  );

  return (
    <Ready fallback={<Fallback />}>
      <div>
        <div style={{ marginTop: top + 12, marginRight: 10, marginLeft: 10 }}>
          <p className="font-medium text-xl m-2">
            学号: {localStorage.getItem('studentID')}
          </p>
          <Button onClick={fetchSchoolLife}>
            测试云家园接口是否能成功拉取
          </Button>
          <Button onClick={refreshToken}>测试刷新token</Button>
          <Button onClick={hideHeader}>隐藏标题</Button>
          <Button onClick={showHeader}>显示标题</Button>
          <Button onClick={() => uiModule.exit()}>退出</Button>
          <Button onClick={() => eventModule.showShare()}>分享</Button>
          <p className="font-medium text-xl m-2">导航</p>
          <Button onClick={() => uiModule.toScreen({ screen: '周课表' })}>
            周课表
          </Button>
          <Button
            onClick={() =>
              uiModule.toScreen({
                screen: '用户资料',
                params: { userId: '5504118086' },
              })
            }
          >
            他的资料
          </Button>
          <Button onClick={() => uiModule.info('23333')}>
            打开 Toast info
          </Button>
          <Button onClick={() => uiModule.success('23333')}>
            打开 Toast success
          </Button>
          <Button onClick={toastLoading}>打开 Toast loading</Button>
          <Button onClick={showVersion}>获取版本号</Button>
          <Button onClick={() => alert(colorScheme)}>获取当前主题</Button>
          <Button
            onClick={() =>
              uiModule.bindBackPress(backPressCb, (success) => {
                if (success) {
                  uiModule.success(
                    '绑定原生返回事件成功，请自行处理返回事件',
                    1
                  );
                } else {
                  uiModule.fail('绑定原生返回事件失败， 请先显示 header', 1);
                }
              })
            }
          >
            绑定原生返回事件
          </Button>
          <Button onClick={() => uiModule.unBindBackPress(backPressCb)}>
            取消绑定原生返回事件
          </Button>

          <Button onClick={() => eventModule.login('username', 'pwd')}>
            登录
          </Button>

          <p className="font-medium text-xl m-2">colors 测试</p>
          <ColorItem color={colors.white} name="colors.white" />
          <ColorItem color={colors.black} name="colors.white" />
        </div>
      </div>
    </Ready>
  );
};

export default App;
