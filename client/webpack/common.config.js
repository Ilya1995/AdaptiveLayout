const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
    fixedPath: '/'
};

const commonConfig = merge([
    parts.loadResolver(),
    parts.loadSvgs({exclude: /node_modules/ }),
    parts.loadMds({exclude: /node_modules/ }),
    parts.loadIcos({exclude: /node_modules/ })
]);

const productionConfig = merge([
    {
        bail: false,
        devtool: 'source-map',
        entry: {
            application: ['./src/index.js']
        },
        output: {
            filename: 'bundle.js',
            path: PATHS.build,
            pathinfo: true,
            publicPath: PATHS.fixedPath
        },
    },
    parts.setNoErrors(),
    parts.loadJavaScript({ include: __dirname + '/', exclude: /node_modules/ }),
    parts.minifyJavaScript(),
    parts.clean(PATHS.build),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true
            },
            safe: true
        }
    }),
    parts.loadProdCss(),
    parts.loadImages({
        options: {
            limit: 1024,
            name: '[name].[ext]'
        }
    }),
    parts.setCompression(),
]);

const developmentConfig = merge([
    {
        bail: true,
        watch: true,
        entry: {
            application: ['./src/index.js']
        },
        output: {
            filename: 'bundle.js',
            chunkFilename: '[id].js',
            path: PATHS.build,
            pathinfo: true,
            publicPath: PATHS.fixedPath
        },
        devtool: 'source-map'
    },
    parts.loadProdCss(),
    parts.setEnvVariables({
        'process.env': {
            NODE_ENV: '"development"',
            styleguideEnabled: true
        }
    }),
    parts.devServer({
        host: 'localhost',
        port: 3000
    }),
    parts.loadJavaScript({ include: __dirname + '/', exclude: /node_modules/ }),
    parts.loadDevCss({exclude: /typography/, options: {sourceMap: true, minimize: true}}),
    parts.loadHtml({ include: __dirname + '/', exclude: /node_modules/ }),
    parts.loadImages(),
    parts.generateSourceMaps()
]);

module.exports = mode => {
    console.log('============= mode => ' + mode + ' =============');
    let modeConfig = mode === 'production' ? productionConfig : developmentConfig;
    return merge(commonConfig, modeConfig, {mode});
};