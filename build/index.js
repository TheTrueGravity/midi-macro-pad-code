"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./midi/controller");
var controller = new controller_1.Controller('APC mini', 0, 1);
controller.createPage('main');
controller.setButton('main', 0, new controller_1.Toggle('test', 0x00, 0x01));
