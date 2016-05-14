var externals = require('./externals');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = {
    entry: {
        'app': './example/src/index.tsx',
        'vendors': Object.keys(externals)
    },
    output: {
        path: path.join(__dirname, '../example'),
        filename: '[name].js',
        libraryTarget: 'umd',
        publicPath: '/'
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }],

        preLoaders: [{
            test: /\.js$/,
            loader: "source-map-loader"
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            minChunks: Infinity
        })
    ]
};

var host = '0.0.0.0';
var port = 9000;

new WebpackDevServer(webpack(config), {
    contentBase: './example',
    hot: true,
    debug: true
}).listen(port, host, function(err, result) {
    if (err) {
        console.log(err);
    }
});
console.log('-------------------------');
console.log('Local web server runs at http://' + host + ':' + port);
console.log('-------------------------');

module.exports = config;
