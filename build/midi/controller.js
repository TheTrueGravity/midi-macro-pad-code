"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var midi_1 = require("./midi");
var controller = /** @class */ (function () {
    function controller(name, inputPort, outputPort) {
        this.input = new midi_1.Input(inputPort);
        this.output = new midi_1.Output(outputPort);
    }
    return controller;
}());
exports.controller = controller;
