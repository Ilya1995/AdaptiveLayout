"use strict";
var config = {
    listen: {
        port: 3550
    },
    database: {
        connection: {
            host: '127.0.0.1',          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'myDatabaseShop',     //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
    },
    sendEmail: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        user: 'test11196@mail.ru',
        pass: '1234567890-qwertyuiop[]'
    },
    modules: {
        path: "./modules/", //папка с пользовательскими модулями
        timeout: 5000, //время ожидания ответа на вызов пользовательских функций, если время ожидания превышено - пользователю возвращается ошибка
        timeoutTimer: 10000, //интервал по которому проверяются таймауты функций
        checkRunModule: 5000 //время через которое проверяется работоспособность модуля при его старте
    },
    env: process.env.NODE_ENV || 'dev',
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};

module.exports = config;