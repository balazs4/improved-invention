const {resolve} = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        resolve(__dirname, 'src', 'index.js')
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', { modules: false }], 'stage-2', 'react'],
                        plugins: ['react-hot-loader/babel']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: mod => mod.context && mod.context.indexOf('node_modules') !== -1
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: resolve(__dirname, 'src', 'index.html')
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        port: 3000,
        contentBase: resolve(__dirname, 'dist')
    }
}