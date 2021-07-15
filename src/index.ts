import { Controller, Page, Push, Toggle } from './midi/controller';

const controller = new Controller('APC mini', 0, 1)

controller.createPage('main')
controller.setButton('main', 0, new Toggle('test', 0x00, 0x01))