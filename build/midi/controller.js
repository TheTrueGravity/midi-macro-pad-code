"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.page = void 0;
var midi_1 = require("./midi");
var collections_1 = require("../modules/collections");
var page = /** @class */ (function () {
    function page(name) {
        this.name = name;
        this.buttons = new collections_1.Collection();
        this.setup = function () { };
    }
    page.prototype.handleMessage = function (message) {
        this.buttons.get(message[0]).run(message);
    };
    return page;
}());
exports.page = page;
var controller = /** @class */ (function () {
    function controller(name, inputPort, outputPort) {
        var _this = this;
        this.currentPage = 'main';
        this.input = new midi_1.Input(inputPort);
        this.output = new midi_1.Output(outputPort);
        this.name = name;
        this.input.on('message', function (message) {
            _this.getCurrentPage().handleMessage(message);
        });
    }
    controller.prototype.getCurrentPage = function () {
        return this.pages.get(this.currentPage);
    };
    controller.prototype.getInputName = function () {
        return this.input.getPortName();
    };
    controller.prototype.getOutputName = function () {
        return this.output.getPortName();
    };
    controller.prototype.setButton = function (page, button, action) {
        var _page = this.pages.get(page);
        _page.buttons.set(button, action);
        this.pages.set(page, _page);
    };
    controller.prototype.setPage = function (page) {
        this.pages.set(page.name, page);
    };
    controller.prototype.changePage = function (name) {
        this.currentPage = name;
        this.pages.get(name).setup();
    };
    return controller;
}());
exports.controller = controller;
