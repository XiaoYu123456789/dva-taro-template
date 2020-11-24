export default {
  // 主包
  pages: [
    'pages/index/index',
    'pages/testAuto/index',
    'pages/WVdemo/index',
  ],
  // 窗口风格
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // tabBar
  tabBar: {
      color: "#999",
      custom: true, //定义是否是自定义tabBar
      selectedColor: "#487EFB",
      backgroundColor: "#fff",
      list: [
        {
          text: "首页",
          pagePath: "pages/index/index",
        },
        {
          text: "首页2",
          pagePath: "pages/index/index",
        }
      ]
    },
  // 分包
     subPackages: [
      {
        "root": "pages/pagesA/", //分包路径
        "pages": [
          //"路径/主页面" 
          'testA/index'
        ]
      },
    ],
}
