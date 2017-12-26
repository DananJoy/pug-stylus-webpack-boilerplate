HtmlWebpackPlugin = require('html-webpack-plugin');
ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/assets/main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            // {
            //     test: /\.styl$/i,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'stylus-loader'
            //     ]
            // }
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
            title: 'Hello Bitches',
            template: './src/index.html',
            filename: './index.html',
            excludeChunks: ['other'],
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