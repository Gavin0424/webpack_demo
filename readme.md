### webpack使用
1. 安装node

2. 生成package.json文件
    ```
    npm init -y
    ```

3. 安装webpack
    ```
    cnpm i webpack --save-dev
    ```
4. 安装webpack-cli(webpack4.0版本以上需要)
    ```
    cnpm i webpack-cli --save-dev
    ```

5. 手工命令直接打包(webpack4.0版本以上需要设置模式)
    ```
    webpack a.js -o bundle.js --mode development
    ```
    
6. 配置命令打包：package.json文件**scripts**中追加如下打包语句，然后运行 *npm run pack*
    ```
    "pack": "webpack a.js -o bundle.js --mode development"
    ```
    
7. 配置 ==webpack.config.js==文件
    ```
    const path = require('path')
    module.exports = {
        entry: {    //入口文件，可多个
            index: path.join(__dirname, '/index.js'),
            home: path.join(__dirname, '/home.js')
        },
        output: {   //输出文件,[name]指入口文件(app、home)
            filename: '[name].bundle.js',
            path: __dirname + '/dist'
        }
    }
    ```
    
    #####    package.json文件中**scripts**修改为
    ```
    "pack": "webpack --mode development --watch" //文件变化自动打包
    ```
    #####   运行 *npm run pack*

8. loader 转换器
    
    ```
    //安装
    cnpm i style-loader css-loader less less-loader --save-dev
    
    //webpack.config.js配置
    module: {
            rules: [
                {
                    test: /\.css$/, //正则匹配所有.css后缀的样式文件
                    use: ['style-loader','css-loader','less-loader']
                },
                {
                    test: /\.less$/,  //正则匹配所有.less后缀的样式文件  
                    use: ['style-loader','css-loader', 'less-loader']
                }
            ]
        }
        
    //入口js文件引入css、less文件
    import '../css/test.css';
    import '../css/style.less';
    ```
    
    #####  也可在引入文件时添加loader转换(webpack.config.js中无需配置module,不推荐)
    ```
    import 'style-loader!css-loader!../css/test.css';
    import 'style-loader!css-loader!less-loader!../css/style.less';
    ```
    
9. 插件(自动实现一些繁琐功能)
    ##### html-webpack-plugin 自动创建html，并将css、js等文件自动引入
    ```
    // 安装
    cnpm i html-webpack-plugin -D
    
    // webpack.config.js 配置
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    plugins: [ //插件
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html',
            template: './src/pages/index.html',
            chunks:['index'],   //多入口文件指定入口文件
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
    ```
    
    #####   clean-webpack-plugin 清空某目录或子目录及文件
    ```
    //安装
    cnpm install clean-webpack-plugin -D
    //webpack.config.js引用
    const {CleanWebpackPlugin}  = require('clean-webpack-plugin')
    new CleanWebpackPlugin() // 清空项目根目录下dist
    ```
10. webpack-dev-server(使用后dist目录不会生成文件,是打包在内存中的)
    ```
    //安装
    cnpm i webpack-dev-server -D
    
    //webpack.config.js 配置
    devServer: { 
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
        progress: true, //进度条
        open: true, //默认打开
        hot: true //热更新(局部刷新)
    }
    
    //package.json 文件修改
    "pack": "webpack-dev-server --mode development --watch"
    ```


