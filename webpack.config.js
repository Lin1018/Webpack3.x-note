const path = require('path')
// webpack默认已经集成的js压缩插件，无需npm下载
const uglify = require('uglifyjs-webpack-plugin')
// 打包生成html
const htmlPlugin = require('html-webpack-plugin')
// 打包css
const extractTextPlugin = require('extract-text-webpack-plugin')


var website = {
    publicPath: 'http://localhost:6060/dist/'
}

module.exports = {
    // 入口文件的配置项
    entry: {
        main: './src/index.js',
    },
    // 出口文件的配置项
    output: {
        // 输出的路径
        path: path.resolve(__dirname, 'dist'),
        // 输出的文件名
        filename: '[name].js',
        publicPath: website.publicPath
    },
    // 模块：解读CSS，图片转换，压缩等
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },{
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 单位为B --> 1kb = 1024B
                        limit: 15000,
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    // 插件，用于生产模块和各项功能
    plugins: [
        // 压缩js代码
        new uglify(),
        new htmlPlugin({
            // 对html文件进行压缩
            minify: {
                // 去掉属性双引号
                removeAttributeQuotes: true
            },
            hash: true,
            // 打包的html模板路径和文件名称
            template: './src/index.html'
        }),
        // css打包位置
        new extractTextPlugin('css/index.css')
    ],
    // 配置webpack开发服务
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        // 服务器的IP地址， 可以使用IP也可以使用localhost
        host: 'localhost',
        // 服务端压缩是否开启
        compress: true,
        // 配置服务端口号
        port: 8080
    }
}
