const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')

module.exports = {
    entry: {    //入口
        index: path.join(__dirname, '/src/js/index.js'),
        home: path.join(__dirname, '/src/js/home.js')
    },
    output: {   //输出
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {   //loader加载器
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.css$/, //正则匹配所有.css后缀的样式文件
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,  //正则匹配所有.less后缀的样式文件  
                use: ['style-loader','css-loader', 'less-loader']
            }
            // {
            //     test: /\.css$/, //css文件
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         }]
            // },
            // {
            //     test: /\.less$/,    
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader'
            //         },
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         }]
            // }
        ]
    },
    // devServer: { //开发服务器配置
    //     port: 3000,
    //     contentBase: path.join(__dirname, 'dist'), //默认打开网页路径
    //     progress: true, //进度条
    //     open: true, //默认打开
    //     hot: true //热更新(局部刷新)
    // },
    plugins: [ //插件
        new CleanWebpackPlugin(), // 清空项目根目录下dist
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html',
            template: './src/pages/index.html',
            chunks:['index'],   //多入口文件指定引用文件
            hash: true,
            minify: {
                removeComments:true, //去除注释
                collapseWhitespace: true //去除空格
            }
        }),
        new HtmlWebpackPlugin({
            title: 'home',
            filename: 'home.html',
            template: './src/pages/home.html',
            chunks:['home'],
            hash: true,
            minify: {
                removeComments:true, //去除注释
                collapseWhitespace: true //去除空格
            }
        }),
    ]

}