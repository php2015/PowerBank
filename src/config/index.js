<<<<<<< HEAD
export default {
  // 配置显示在浏览器标签的title
  title: "充电宝",
  // token在cookie中存储的天数，默认1天
  cookieExpires: 1,
  // 是否使用国际化，默认为false 如果不适用，则需要在路由中给需要在菜单中展示的路由设置meta：{title:'xxx'} 用来在菜单中显示文字
  useI18n: true,
  // api请求基础路径
  baseUrl: {
    // dev: 'https://47.114.37.8:8888/',
    // dev: "http://172.16.1.46:8638/",
    dev: "http://101.71.142.198:8639",
    // dev: 'http://192.168.1.244:8090/v1/',
    pro: ""
  },
  // 默认打开的首页的路由name值，默认为home
  homeName: "index",
  // 需要加载的插件
  plugin: {}
};
=======
export default {
    // 配置显示在浏览器标签的title
    title: '充电宝',
    // token在cookie中存储的天数，默认1天
    cookieExpires: 1,
    // 是否使用国际化，默认为false 如果不适用，则需要在路由中给需要在菜单中展示的路由设置meta：{title:'xxx'} 用来在菜单中显示文字
    useI18n: true,
    // api请求基础路径
    baseUrl: {
        dev: 'https://47.114.37.8:8888/',
        // dev: 'http://192.168.1.244:8090/v1/',
        pro: 'http://101.71.142.198:8644',
    },
    // 默认打开的首页的路由name值，默认为home
    homeName: 'index',
    // 需要加载的插件
    plugin: {
    }

}
>>>>>>> 3f6e3ebbe1d3edfbd6049306bfc18d03a9e8d015
