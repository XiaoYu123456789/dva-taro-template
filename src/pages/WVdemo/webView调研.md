# WebView

## WebView的注意事项
1. web-view里内嵌的域名域名在小程序管理后台设置 <strong><span style="color: red">业务域名</span></strong> ，注意是业务域名，不是服务器域名。另外个人小程序目前是没有这个设置，因此也就无法使用这个功能。
2. 一个页面（wml）只能放置一个web-view，且会覆盖其他的组件铺满屏幕，这时候你就当微信小程序是个浏览器好了。
3. web-view打开的页面必须是支持https的。
4. 目前web-view 支持的JSSDK接口：
   - 图像接口	：拍照或上传、预览图片、上传图片、下载图片、获取本地图片。
   - 音频接口	：开始录音、停止录音、监听录音自动停止、播放语音、暂停播放、停止播放、监听语音播放完毕、上传接口、下载接口。
   - 智能接口	：识别音频。
   - 设备信息 ：获取网络状态。	
   - 地理位置 : 使用内置地图打开地点。
   - 摇一摇周边	。
   - 微信扫一扫	。
   - 长按识别	。
   - 可使用JSSDK 1.3.2提供的接口返回小程序页面：navigateTo、navigateBack、switchTab等等。
5. 支持iframe，但是内嵌的页面需要支持设置白名单。
6. 302跳转，跳转的域名也要设置在业务域名里（跳转相关的都得设置白名单）。
7. web-view不支持微信支付，但web-view内嵌的页面使用了公众号授权的微信支付，是可以在内嵌的页面使用微信支付的。换句话说，如果如果用web-view内嵌公众号的h5页面，利用JSSDK是可以使用微信支付的。
8. 可以使用input-file进行文件上传，但是对于部分苹果机支持不好。
9. web-view的`<a>`标签不能下载文件,不支持外链下载,可以通过跳转到小程序里面选择使用wx.downloadFile(Object object) 进行文件下载

## 如何在web-view当中使用JSSDK
1. 需要有一个小程序关联公众号才可以使用JSSDK
2. 在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.6.0.js 。
3. 通过config接口注入权限验证配置。
4. 通过ready接口处理成功验证，config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

- 注意：小程序JSSDK接口文档 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1




