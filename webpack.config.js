HtmlWebpackPlugin = require('html-webpack-plugin');
ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            { 
                test: [ /\.styl$/, /\.css$/ ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                            { 
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            }, 
                            { 
                                loader: 'stylus-loader' 
                            }
                    ],
                    publicPath: __dirname + '/dist'
                })
            },
            {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    'pug-html-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Pug + Stylus Template',
            template: './src/index.pug',
            filename: './index.html',
            minify: {
                collapseWhitespace: false
            },
            hash: true      
        }),
        new ExtractTextPlugin({
            filename: "styles.bundle.css",
            allChunks: true
        })
    ]
};