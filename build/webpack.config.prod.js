var externals = require('./externals');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'react-extendable-grid': './src/index.tsx',
        'react-extendable-grid.min': './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],

    externals: externals
};
