const path = require('path');
exports.loadResolver = () => ({
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'src/')
        }
    }
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include,
                exclude,
                use: 'babel-loader'
            }
        ]
    }
});

const HtmlWebPackPlugin = require('html-webpack-plugin');
exports.loadHtml = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                include,
                exclude,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            }
        ]
    }
    //Эта штука позволяет получать bundle и css не указывая их index.html
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: './index.html',
    //         filename: './index.html'
    //     })
    // ]
});

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: 'errors-only',
        host,
        port,
        open: true,
        overlay: false
    }
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.loadProdCss = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include,
                exclude,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
});

exports.loadDevCss = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options
                    },
                    'sass-loader'
                ]
            }
        ]
    }
});


const PurifyCSSPlugin = require('purifycss-webpack');

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })]
});


exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)$/,
                include,
                exclude,
                use: {
                    loader: 'url-loader',
                    options
                }
            }
        ]
    }
});


exports.loadIcos = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.ico$/,
                include,
                exclude,
                use: {
                    loader: 'file-loader?name=[name].[ext]'
                }
            }
        ]
    }
});

exports.loadMds = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.md$/,
                include,
                exclude,
                use: 'raw-loader'
            }
        ]
    }
});


exports.loadSvgs = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                include,
                exclude,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [{ cleanupIDs: false }],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            }
        ]
    }
});

exports.generateSourceMaps = () => ({
    devtool: 'source-map'
});


const CleanWebpackPlugin = require('clean-webpack-plugin');
exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])]
});


const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [new UglifyWebpackPlugin({ sourceMap: true, extractComments: true })]
    }
});


const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false
        })
    ]
});


const webpack = require('webpack');

exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [new webpack.DefinePlugin(env)]
    };
};


exports.setEnvVariables = obj => {
    return {
        plugins: [new webpack.DefinePlugin(obj)]
    };
};

exports.setLoaderOptionsPlugin = obj => {
    return {
        plugins: [new webpack.LoaderOptionsPlugin(obj)
]
    };
};


exports.setNoErrors = () => {
    return new webpack.NoEmitOnErrorsPlugin();
};


const CompressionPlugin = require('compression-webpack-plugin');
exports.setCompression = () => {
    return {
        plugins: [new CompressionPlugin()]
    };
};

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
exports.setAnalyzer = () => {
    return {
        plugins: [new BundleAnalyzerPlugin()]
    };
};


exports.setHashModuleIds = () => {
    return {
        plugins: [new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        })]
    };
};