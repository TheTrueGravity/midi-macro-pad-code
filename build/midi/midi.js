"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPorts = exports.Output = exports.Input = void 0;
var midi_1 = __importDefault(require("midi"));
var Input = /** @class */ (function () {
    function Input(port) {
        var _this = this;
        this.input = new midi_1.default.Input();
        this.closed = true;
        this.onOpen = new Function;
        this.onClose = new Function;
        if (typeof port === 'number') {
            this.portNumber = port;
        }
        else if (typeof port === 'string') {
            this.portName = port;
        }
        else {
            throw new Error('Port has to be a number or a string!');
        }
        this.openPort();
        this.input.on('message', function (timeStamp, message) { return _this.emit('message', timeStamp, message); });
        return this;
    }
    Input.prototype.getPortNamesAndIds = function () {
        var out = new Object;
        for (var i = 0; i < this.input.getPortCount(); i++) {
            out[this.input.getPortName(i)] = i;
        }
        return out;
    };
    Input.prototype.getPortNames = function () {
        var out = new Array;
        for (var i = 0; i < this.input.getPortCount(); i++) {
            out[out.length] = this.input.getPortName(i);
        }
        return out;
    };
    Input.prototype.getPortName = function () {
        return this.input.getPortName(this.portNumber);
    };
    Input.prototype.openPort = function () {
        if (this.portNumber != undefined) {
            this.input.openPort(this.portNumber);
        }
        else {
            this.portNumber = this.getPortNamesAndIds()[this.portName];
            this.input.openPort(this.portNumber);
        }
        this.closed = false;
        this.emit('open');
    };
    Input.prototype.closePort = function () {
        this.input.closePort();
        this.closed = true;
        this.emit('close');
    };
    Input.prototype.emit = function (call) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (call == 'message')
            this.onMessage(args);
        if (call == 'open')
            this.onOpen(args);
        if (call == 'close')
            this.onClose(args);
    };
    Input.prototype.on = function (call, callback) {
        if (call == 'message')
            this.onMessage = callback;
        if (call == 'open')
            this.onOpen = callback;
        if (call == 'close')
            this.onClose = callback;
    };
    return Input;
}());
exports.Input = Input;
var Output = /** @class */ (function () {
    function Output(port) {
        this.output = new midi_1.default.Output();
        this.closed = true;
        this.onOpen = new Function;
        this.onClose = new Function;
        if (typeof port === 'number') {
            this.portNumber = port;
        }
        else if (typeof port === 'string') {
            this.portName = port;
        }
        else {
            throw new Error('Port has to be a number or a string!');
        }
        this.openPort();
        return this;
    }
    Output.prototype.getPortNamesAndIds = function () {
        var out = new Object;
        for (var i = 0; i < this.output.getPortCount(); i++) {
            out[this.output.getPortName(i)] = i;
        }
        return out;
    };
    Output.prototype.getPortNames = function () {
        var out = new Array;
        for (var i = 0; i < this.output.getPortCount(); i++) {
            out[out.length] = this.output.getPortName(i);
        }
        return out;
    };
    Output.prototype.sendMessage = function (message) {
        this.output.sendMessage(message);
    };
    Output.prototype.getPortName = function () {
        return this.output.getPortName(this.portNumber);
    };
    Output.prototype.openPort = function () {
        if (this.portNumber != undefined) {
            this.output.openPort(this.portNumber);
        }
        else {
            this.portNumber = this.getPortNamesAndIds()[this.portName];
            this.output.openPort(this.portNumber);
        }
        this.closed = false;
        this.emit('open');
    };
    Output.prototype.closePort = function () {
        this.output.closePort();
        this.closed = true;
        this.emit('close');
    };
    Output.prototype.emit = function (call) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (call == 'open')
            this.onOpen(args);
        if (call == 'close')
            this.onClose(args);
    };
    Output.prototype.on = function (call, callback) {
        if (call == 'open')
            this.onOpen = callback;
        if (call == 'close')
            this.onClose = callback;
    };
    return Output;
}());
exports.Output = Output;
function getPorts() {
    var input = new midi_1.default.Input();
    var output = new midi_1.default.Output();
    var inputPortCount = input.getPortCount();
}
exports.getPorts = getPorts;
