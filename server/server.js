const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const config = require('./config');
const moduleHandler = require('./moduleHandler');
require('./console.js');

app.set('port', process.env.port || config.listen.port);
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next();
});
moduleHandler.runModules();
// setTimeout(function () {
//     moduleHandler.modules['clients'].execFunc('registration', {data: 256}, function (result, data) {
//         console.log(result);
//         console.log(data);
//     });
// }, 4000);

app.listen(app.get('port'), function (err) {
    if (err) {
        console.error('Сервер не запущен!')
    } else {
        console.info('Сервер запущен на порту ' + app.get('port'));
    }
});

app.all('/api/*', function (req, res) {
    var routes = req.url.split('/').filter(Boolean);
    moduleHandler.modules[routes[1]].execFunc(routes[2], req.body, function (result, data) {
        console.log(result);
        console.log(data);
        res.send({result: result, data: data});
    });
});