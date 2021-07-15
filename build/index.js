"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./midi/controller");
var _controller = new controller_1.controller('APC mini', 0, 1);
console.log(_controller.getInputName(), _controller.getOutputName());
