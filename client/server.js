const http = require('http');
const httpProxy = require('http-proxy');
const express = require('express');
const app = express();
const proxy = new httpProxy.createProxyServer({
    target: {
        port: 3550
    }
});

(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack/common.config')('development');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }));

    app.use(express.static(__dirname + '/'));
})();


const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});

app.all('/api/*', (req, res) => {
    proxy.web(req, res);
    proxy.on('error', (err) => {
        console.error('Error httpProxy: ' + err);
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});