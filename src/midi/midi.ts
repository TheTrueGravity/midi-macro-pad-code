import midi from 'midi'

export class Input {
    private portNumber: number
    private portName: string
    private input = new midi.Input();
    public closed = true;
    private onMessage: Function
    private onOpen = new Function
    private onClose = new Function
    
    constructor(port: number | string) {
        if (typeof port === 'number') {
            this.portNumber = port
        } else if (typeof port === 'string') {
            this.portName = port
        } else {
            throw new Error('Port has to be a number or a string!')
        }
        this.openPort()
        this.input.on('message', (timeStamp: Number, message: []) => this.emit('message', timeStamp, message))
        return this
    }

    public getPortNamesAndIds() {
        const out = new Object;
        for (var i = 0; i < this.input.getPortCount(); i++) {
            out[this.input.getPortName(i)] = i
        }
        return out
    }

    public getPortNames() {
        const out = new Array;
        for (var i = 0; i < this.input.getPortCount(); i++) {
            out[out.length] = this.input.getPortName(i)
        }
        return out
    }

    public getPortName() {
        return this.input.getPortName(this.portNumber)
    }

    public openPort() {
        if (this.portNumber != undefined) {
            this.input.openPort(this.portNumber)
        } else {
            this.portNumber = this.getPortNamesAndIds()[this.portName]
            this.input.openPort(this.portNumber)
        }
        this.closed = false
        this.emit('open')
    }

    public closePort() {
        this.input.closePort()
        this.closed = true
        this.emit('close')
    }

    private emit(call: 'message' | 'open' | 'close', ...args: any[]) {
        if (call == 'message') this.onMessage(args)
        if (call == 'open') this.onOpen(args)
        if (call == 'close') this.onClose(args)
    }

    public on(call: 'message' | 'open' | 'close', callback: Function) {
        if (call == 'message') this.onMessage = callback
        if (call == 'open') this.onOpen = callback
        if (call == 'close') this.onClose = callback
    }
}

export class Output {
    private portNumber: number
    private portName: string
    private output = new midi.Output();
    public closed = true;
    private onOpen = new Function
    private onClose = new Function

    constructor(port: number | string) {
        if (typeof port === 'number') {
            this.portNumber = port
        } else if (typeof port === 'string') {
            this.portName = port
        } else {
            throw new Error('Port has to be a number or a string!')
        }
        this.openPort()
        return this
    }

    public getPortNamesAndIds() {
        const out = new Object;
        for (var i = 0; i < this.output.getPortCount(); i++) {
            out[this.output.getPortName(i)] = i
        }
        return out
    }

    public getPortNames() {
        const out = new Array;
        for (var i = 0; i < this.output.getPortCount(); i++) {
            out[out.length] = this.output.getPortName(i)
        }
        return out
    }

    public sendMessage(message: []) {
        this.output.sendMessage(message);
    }

    public getPortName() {
        return this.output.getPortName(this.portNumber)
    }

    public openPort() {
        if (this.portNumber != undefined) {
            this.output.openPort(this.portNumber)
        } else {
            this.portNumber = this.getPortNamesAndIds()[this.portName]
            this.output.openPort(this.portNumber)
        }
        this.closed = false
        this.emit('open')
    }

    public closePort() {
        this.output.closePort();
        this.closed = true;
        this.emit('close')
    }
    
    private emit(call: 'open' | 'close', ...args: any[]) {
        if (call == 'open') this.onOpen(args)
        if (call == 'close') this.onClose(args)
    }

    public on(call: 'open' | 'close', callback: Function) {
        if (call == 'open') this.onOpen = callback
        if (call == 'close') this.onClose = callback
    }
}

export function getPorts() {
    const input = new midi.Input()
    const output = new midi.Output()

    const inputPortCount: number = input.getPortCount()
    const outputPortCount: number = output.getPortCount()

    const inputPorts = []
    const outputPorts = []

    for (let i = 0; i < inputPortCount; i++) {
        inputPorts[i] = {name: input.getPortName(i), index: i}
    }
    for (let i = 0; i < outputPortCount; i++) {
        outputPorts[i] = {name: output.getPortName(i), index: i}
    }

    console.log(inputPorts, outputPorts)
}