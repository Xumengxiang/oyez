const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  devtool:'#eval-source-map',
  watch: true,
  watchOptions:{
    // 不监听的文件夹或者文件，支持正则匹配
    // 默认为空
    ignored:/node_modules/,
    // 监听到变化后会等300ms再去执行动作，防止文件更新太快导致编译频率过高
    // 默认300ms
    aggregateTimeout:300,
    // 判断文件是否发生变化是通过轮询系统指定文件有没有变化实现的
    // 默认轮询间隔1000ms
    poll:1000
  },
  // 入口文件
  entry:'./src/index.ts',
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'
      },{
        test:/\.tsx?$/,
        loader:'ts-loader',
        options:{
          transpileOnly:true,
          appendTsSuffixTo:[/\.vue$/]
        }
      },{
        test:/\.(css|less)$/,
        loader:'vue-style-loader!less-loader|css-loader'
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      inject:true
    })
  ]
}