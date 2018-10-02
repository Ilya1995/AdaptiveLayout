var settings;
var moment = require('moment');
var mysql = require('mysql');
var async = require('async');
var passwordHash = require('password-hash');
var nodemailer = require('nodemailer');
process.on('message', function (message) {
    if (message.fn) {
        clients[message.fn](message.params, function (data) {
            process.send({id: message.id, data: data});
        });
    } else {
        if (message.type) {
            switch (message.type) {
                case "settings":
                    settings = message.data;
                    clients.init();
                    break;
                default:
                    break;
            }
        }
    }
});

var CLIENTS = function () {};

CLIENTS.prototype.init = function () {
    require(settings.mainPath+"/console.js");
    moment.locale('ru');
    this.config = require(settings.mainPath + '/config');
};

/**
 * Авторизация пользователя
 * @param data
 * @param data.login
 * @param data.password
 * @param callback
 */
CLIENTS.prototype.authorization = function (data, callback) {
    console.log(data);
    if (!data.login || !data.password) {
        return callback('Не указаны данные для авторизации');
    }
    var connection = mysql.createConnection(this.config.database.connection);
    async.waterfall([
        function (callback) {
            var hashedPassword = passwordHash.generate(data.password, {algorithm: 'sha256'});
            var sql = "select clients.id from clients where login = ? and password = ?";
            connection.query(sql, [data.login, hashedPassword], function (err, rows) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка авторизации');
                }
                if (rows.length === 0) return callback('Данный пользователь не зарегистрирован');
                return callback(null, rows[0].id);
            });
        },
        function (clientId, callback) {
            var sql = "select login, email from clients where clients.id = ?";
            connection.query(sql, [clientId], function (err, rows) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка поиска');
                }
                return callback(null, rows[0]);
            });
        }
    ], function (err, data) {
        connection.destroy();
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
};

/**
 * Регистрация пользователя
 * @param data
 * @param data.login
 * @param data.password
 * @param data.confirmPassword - повторение пароля
 * @param data.email
 * @param callback
 */
CLIENTS.prototype.registration = function (data, callback) {
    console.log(data);
    if (!data.login || !data.password || !data.confirmPassword || !data.email) return callback('Не заполнены данные');
    if (data.password !== data.confirmPassword) return callback('Пароли не совпадают');

    var connection = mysql.createConnection(this.config.database.connection);
    var that = this;
    async.waterfall([
        function (callback) {
            var sql = "SELECT id FROM clients WHERE login = ?";
            connection.query(sql, [data.login], function (err, res) {
                if (res.rows.length) return callback('Пользователь с таким логином уже зарегистрирован');
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка регистрации');
                }
                return callback(null);
            });
        },
        function (callback) {
            connection.beginTransaction(function (err) {
                if (err) {
                    console.error(err, ' Ошибка при начале транзакции');
                    return callback('Ошибка регистрации');
                }
                var hashedPassword = passwordHash.generate(data.password, {algorithm: 'sha256'});
                var sql = "INSERT INTO clients (login, password, email) values(?, ?, ?)";
                connection.query(sql, [data.login, hashedPassword, data.email], function (err) {
                    if (err) {
                        console.error(err.message);
                        return callback('Ошибка регистрации');
                    }
                    return callback(null);
                });
            });
        },
        function (callback) {
            var configEmail = that.config.sendEmail;
            var transporter = nodemailer.createTransport({
                host: configEmail.host,
                port: configEmail.port,
                secure: configEmail.secure,
                auth: {
                    user: configEmail.user,
                    pass: configEmail.pass
                }
            });
            var mailOptions = {
                from: configEmail.user,
                to: data.email,
                subject: 'tema',
                text: 'hi'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    return callback('Ошибка регистрации');
                }
                console.log(info);
                return callback(null);
            });
        }
    ], function (err) {
        if (err) {
            console.error(err);
            return connection.rollback(function () {
                connection.destroy();
                return callback(err);
            });
        }
        connection.commit(function (cmError) {
            if (cmError) {
                return connection.rollback(function () {
                    connection.destroy();
                    return callback('Ошибка регистрации');
                });
            }
            connection.destroy();
            return callback(null);
        });
    });
};


var clients = new CLIENTS();
process.send({data: "MODULE_STARTED"});