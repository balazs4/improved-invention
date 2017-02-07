const {resolve} = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const app = {
    entry: [resolve(__dirname, 'src', 'index.js')],
    output: {
        path: resolve(__dirname, 'dist')
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: mod => mod.context && mod.context.indexOf('node_modules') !== -1
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: resolve(__dirname, 'src', 'index.html'),
            title: require('./package.json').name,
        }),
    ],
    resolve: {
        alias: {
            'react' : 'preact-compat/dist/preact-compat',
            'react-dom' : 'preact-compat/dist/preact-compat'
        }
    }
}

const mode = {
    development: {
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server'
        ],
        output: {
            filename: '[name].js'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new FriendlyErrorsWebpackPlugin(),
        ],
        devtool: 'inline-source-map',
        devServer: {
            quiet: true,
            hot: true,
            port: 3000,
            contentBase: resolve(__dirname, 'dist')
        }
    },
    production: {
        output: {
            filename: '[name].[hash].js'
        },
        plugins: [
            new FaviconsWebpackPlugin(resolve(__dirname, 'src', 'logo.png')),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                compress: {
                    warnings: false,
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    screw_ie8: true
                },
                output: {
                    comments: false,
                },
                exclude: [/\.min\.js$/gi] // skip pre-minified libs
            }),
            new CompressionWebpackPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0
            })
        ],
        devtool: 'source-map',
    }
}

module.exports = merge.smart(mode[process.env.NODE_ENV || 'development'], app);