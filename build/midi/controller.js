"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Page = exports.Toggle = exports.Push = void 0;
var midi_1 = require("./midi");
var collections_1 = require("../modules/collections");
var Push = /** @class */ (function () {
    function Push(name, offColour, onColour) {
        var _this = this;
        this.run = function (message, output) {
            if (message[0] == 128) {
                _this.onRelease();
                output.sendMessage([0x90, message[1], _this.offColour]);
            }
            else if (message[0] == 144) {
                _this.onPress();
                output.sendMessage([0x90, message[1], _this.onColour]);
            }
        };
        this.name = name;
        this.offColour = offColour;
        this.onColour = onColour;
        this.type = 'push';
        this.onPress = function () { return console.log('pressed'); };
        this.onRelease = function () { return console.log('released'); };
    }
    return Push;
}());
exports.Push = Push;
var Toggle = /** @class */ (function () {
    function Toggle(name, offColour, onColour) {
        var _this = this;
        this.toggled = false;
        this.run = function (message, output) {
            if (message[0] == 144) {
                _this.onToggle();
                if (_this.toggled) {
                    _this.onPress();
                    output.sendMessage([0x90, message[1], _this.offColour]);
                }
                else {
                    _this.onPress();
                    output.sendMessage([0x90, message[1], _this.onColour]);
                }
                _this.toggled = !_this.toggled;
            }
        };
        this.name = name;
        this.offColour = offColour;
        this.onColour = onColour;
        this.type = 'push';
        this.onPress = function () { return console.log('pressed'); };
        this.onRelease = function () { return console.log('released'); };
        this.onToggle = function () { return console.log('toggled'); };
    }
    return Toggle;
}());
exports.Toggle = Toggle;
var Page = /** @class */ (function () {
    function Page(name) {
        this.name = name;
        this.buttons = new collections_1.Collection();
        this.setup = function () { };
    }
    Page.prototype.handleMessage = function (message, output) {
        this.buttons.get(message[1]).run(message, output);
    };
    return Page;
}());
exports.Page = Page;
var Controller = /** @class */ (function () {
    function Controller(name, inputPort, outputPort) {
        var _this = this;
        this.currentPage = 'main';
        this.input = new midi_1.Input(inputPort);
        this.output = new midi_1.Output(outputPort);
        this.pages = new collections_1.Collection();
        this.name = name;
        this.input.on('message', function (message) {
            _this.getCurrentPage().handleMessage(message, _this.output);
        });
    }
    Controller.prototype.getCurrentPage = function () {
        return this.pages.get(this.currentPage);
    };
    Controller.prototype.getInputName = function () {
        return this.input.getPortName();
    };
    Controller.prototype.getOutputName = function () {
        return this.output.getPortName();
    };
    Controller.prototype.setButton = function (page, button, action) {
        var _page = this.pages.get(page);
        _page.buttons.set(button, action);
        this.pages.set(page, _page);
        _page.setup();
    };
    Controller.prototype.createPage = function (name) {
        this.pages.set(name, new Page(name));
    };
    Controller.prototype.setPage = function (page) {
        this.pages.set(page.name, page);
    };
    Controller.prototype.changePage = function (name) {
        this.currentPage = name;
        this.pages.get(name).setup();
    };
    return Controller;
}());
exports.Controller = Controller;
