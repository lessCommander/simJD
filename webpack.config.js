let path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
　　　　　　     loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                // use: 'file-loader'
                use: {
                    loader: 'file-loader',
                    options:{
                        name:'fonts/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.(htm|html)$/,
                loader: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "src/index.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new ExtractTextPlugin("index.css")
    ], // 配置html,css插件
    devServer:{
        contentBase:path.resolve(__dirname, 'dist'),
        host:'127.0.0.1',
        compress:true,
        port:8080
    } // 配置webpack服务
};