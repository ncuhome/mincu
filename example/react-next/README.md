# Mincu React 模板

1. 目前没有发包，请自行 link 后再进行调试
2. 考虑将 lib/hooks 代码放在主包里
3. 之后使用 deeplink 在 app 端内调试

## Link 步骤

```shell
# 1. mincu/
yarn link

# 2. mincu/example/react-next/
yarn link mincu

# 3. mincu/example/react-next/node_modules/react/
yarn link

# 4. mincu/
yarn link react
```

## 如何调试

[iOS 调试方法](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Debugging.md#ios--safari)

[Android 调试方法](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Debugging.md#android--chrome)