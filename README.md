# lovezz-web

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 1.build for production with minification  此时会自动打包在dist目录下
npm run build

# build for production and view the bundle analyzer report
npm run build --report


# 2.安装服务
npm  install -g serve
# 3.启动
serve dist

#安装vant
npm i vant -S

#babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
npm i babel-plugin-import -D
```

访问lovezz/xxx/xxx的接口都属于后台接口，只有带lovezz前缀才会代理后台服务器

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
