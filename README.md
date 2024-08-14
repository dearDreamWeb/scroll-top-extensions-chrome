# 滚上去

这是一款`Chrome插件`,用户进行网站内容浏览时，提供返回顶部按钮，点击后返回到网站顶部。

# 特点

- 自由开关：自由选择需要使用该功能的网站
- 自定义文案：用户可以自定义想要的文案
- 样式丰富：多种样式可供选择

# 后续规划

- 加入离线模式和在线模式，在线模式支持账号登录，多台设备可共享数据
- 加入多种返回顶部的效果

# 示例图

## 配置界面

![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/pic/iShot_2024-08-09_00.03.56.png)

## 管理配置的网站

![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/pic/iShot_2024-08-09_00.04.10.png)

## 返回顶部按钮

![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/pic/iShot_2024-08-09_00.04.43.png)

# 使用

# 第一种方式

1. 在 `releases` 中点击下载压缩包,[releases地址](https://github.com/dearDreamWeb/scroll-top-extensions-chrome/releases/tag/v1.0.0)
2. 解压之后再管理扩展程序界面中拖拽进去尽快

# 第二种方式

`Chrome商店`安装即可，点击 [滚上去chrome商店](https://chromewebstore.google.com/detail/%E6%BB%9A%E4%B8%8A%E5%8E%BB/ogafefdnennbjdkiofhgapfbdgjdncpm?hl=en&authuser=0) 进行安装。

# 开发
环境

```
node >= 18.19.1
```

运行

```
pnpm dev
```

打包

```
pnpm build
```
# 技术栈
- wxt
- react
- vite
- css modules
- antd