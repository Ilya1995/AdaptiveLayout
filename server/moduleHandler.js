'use strict';

var path = require('path');
var childProcess = require('child_process');
var config = require('./config');
var _ = require('underscore');

/**
 * Создает экземпляр ModuleHandler.
 *
 * @constructor
 * @this {ModuleHandler}
 */
var ModuleHandler = function () {
    this.modules = {};
};

ModuleHandler.prototype.runModules = function (callback) {
    var self = this;
    var nameModules = ['api', 'clients'];
    _.each(nameModules, function (nameModule) {
        var module = childProcess.spawn(process.execPath, [config.modules.path+nameModule+'/main.js'], { stdio: ['pipe', 1, 2, 'ipc'] });
        module.moduleName = nameModule;
        self.modules[module.moduleName] = module;
        self.processModule(module);
    });
};


/**
 * Устанавливает для модуля обработчики событий и инициализирует очередь сообщений
 *
 * @param {Module} module объект модуля для инициализации
 * @param {Function} callback функция, вызывающаяся после инициализации модуля
 * @this  {ModuleHandler}
 */
ModuleHandler.prototype.processModule = function (module) {
    module.running = false;
    module.tasks = {};
    module.taskID = 0;
    /** Обработка завершения работы модуля. Функции, не успевшие отработать до завершения работы возвращают
     *  сообщения об остановке модуля
     *
     * @param {Integer} code код, с которым завершился процесс. Любые коды, отличные от 0 обозначают ошибку
     * @this  {Module}
     */
    module.on('exit', function (code) {
        if (!code && this.running) {
            console.info('Модуль ' + this.moduleName + ' успешно завершил работу');
            for (var i in this.tasks) {
                this.tasks[i].callback(false, 'Модуль был остановлен до завершения работы функции');
            }
        } else {
            if (!this.running) {
                code = '1. Превышено время инициализации модуля'
            }
            console.error('Модуль ' + this.moduleName + ' завершил работу c ошибкой. Код ошибки ', code);
            for (var i in this.tasks) {
                this.tasks[i].callback(false, 'Неожиданное завершение работы модуля');
            }
        }
        this.running = false;
        this.tasks = {};
    });
    /** Обработка сообщений от модуля. Если сообщение является результатом работы функции вызывается соответствующий callback
     *
     * @param {Object} message объект сообщения
     * @this  {Module}
     */
    module.on('message', function (message) {
        /** Системные сообщения ID не имеют, сообщения-ответы на пользовательские запросы ID имеют*/
        if (message.id) {
            if (this.tasks[message.id] && this.tasks[message.id].callback) {
                this.tasks[message.id].callback(true, message.data);
                delete this.tasks[message.id];
            }
        } else {
            if (message.data) {
                if (typeof(message.data) === 'string') {
                    switch (message.data) {
                        /** Модуль считается запущенным только после получения сообщения с текстом 'MODULE_STARTED' */
                        case 'MODULE_STARTED':
                            this.running = true;
                            console.info('Модуль ' + this.moduleName + ' запущен');
                            this.send({type: 'settings', data: {mainPath: path.dirname(process.mainModule.filename)}});
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    });
    /**
     * Функция, передающая запрос к модулю и записывающая в tasks callback'и, которые будут вызваны после
     * завершения работы функции в модуле
     *
     * @param {String} funcName имя вызываемой функции
     * @param {Object} params объект с параметрами для вызываемой функции
     * @param {Array} entities список привязанных entities
     * @param {Integer} accountId id аккаунта
     * @param {Function} callback функция, вызывающаяся после возврата результата работы модуля
     * @this  {Module}
     */
    module.execFunc = function (funcName, params, callback) {
        this.taskID++;
        this.tasks[this.taskID] = {time: new Date().getTime(), callback: callback};
        this.send({fn: funcName, params: params, id: this.taskID});
    };


    /**
     * Функция, удаляющая старые запросы, которые могут накапливаться из-за неправильной
     * работы модулей, такой как игнорирование callback-ов или некртитическими ошибками
     *
     * @this {Module}
     */
    module.clearOldTasks = function () {
        var currentTime = new Date().getTime();
        for (var i in this.tasks) {
            if (this.tasks[i].time + config.modules.timeout < currentTime) {
                this.tasks[i].callback(false, 'Превышен интервал ожидания работы функции. Возможно ошибка внутри модуля ' + this.moduleName);
                delete this.tasks[i];
            }
        }
    };

    setInterval(module.clearOldTasks.bind(module), config.modules.timeoutTimer);
    setTimeout(function () {
        if (!module.running) {
            module.kill('SIGHUP');
            delete this.modules[module.moduleName];
        }
    }.bind(this), config.modules.checkRunModule);
};


module.exports = new ModuleHandler();