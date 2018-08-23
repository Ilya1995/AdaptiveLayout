var settings;
process.on('message', function (message) {
    if (message.fn) {
        api[message.fn](message.params, function (data) {
            process.send({id: message.id, data: data});
        });
    } else {
        if (message.type) {
            switch (message.type) {
                case "settings":
                    settings = message.data;
                    api.init();
                    break;
                default:
                    break;
            }
        }
    }
});

var API = function () {};

API.prototype.init = function () {
    require(settings.mainPath+"/console.js");
    this.mysql = require('mysql');
    this.moment = require('moment');
    this.config = (require(settings.mainPath + '/config'));
    this.moment.locale('ru');
};


API.prototype.hi = function (data, callback) {
    console.log(data);
    console.log(typeof callback);
    return callback({result: true, data: true});
};


var api = new API();
process.send({data: "MODULE_STARTED"});