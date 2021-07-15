import { Input, Output } from "./midi";
import { Collection } from '../modules/collections';

export interface Button {
    name: string
    type: 'push' | 'toggle'
    offColour: number
    onColour: number
    run(message: number[], output: Output)
    onPress?: Function
    onRelease?: Function
    onToggle?: Function
}

export class Push implements Button {
    name: string
    type: 'push' | 'toggle'
    offColour: number
    onColour: number
    onPress: Function
    onRelease: Function
    
    run = (message: number[], output: Output) => {
        if (message[0] == 128) {
            this.onRelease()
            output.sendMessage([0x90, message[1], this.offColour])
        } else if (message[0] == 144) {
            this.onPress()
            output.sendMessage([0x90, message[1], this.onColour])
        }
    }

    constructor (name: string, offColour: number, onColour: number) {
        this.name = name
        this.offColour = offColour
        this.onColour = onColour

        this.type = 'push'
        this.onPress = () => console.log('pressed')
        this.onRelease = () => console.log('released')
    }
}

export class Toggle implements Button {
    name: string
    type: 'push' | 'toggle'
    offColour: number
    onColour: number
    onPress: Function
    onRelease: Function
    onToggle: Function

    private toggled: boolean = false
    
    run = (message: number[], output: Output) => {
        if (message[0] == 144) {
            this.onToggle()
            if (this.toggled) {
                this.onPress()
                output.sendMessage([0x90, message[1], this.offColour])
            } else {
                this.onPress()
                output.sendMessage([0x90, message[1], this.onColour])
            }
            this.toggled = !this.toggled
        }
    }

    constructor (name: string, offColour: number, onColour: number) {
        this.name = name
        this.offColour = offColour
        this.onColour = onColour

        this.type = 'push'
        this.onPress = () => console.log('pressed')
        this.onRelease = () => console.log('released')
        this.onToggle = () => console.log('toggled')
    }
}

export interface Page {
    name: string,
    buttons: Collection<number, Button>,
    setup: Function
}

export class Page implements Page {
    public name: string
    public buttons: Collection<number, Button>
    public setup: Function

    constructor(name: string) {
        this.name = name
        this.buttons = new Collection()
        this.setup = () => {}
    }

    public handleMessage(message: number[], output: Output) {
        this.buttons.get(message[1]).run(message, output)
    }
}

export class Controller {
    private input: Input
    private output: Output
    private currentPage: string = 'main'
    private pages: Collection<string, Page>

    public name: string

    constructor (name: string, inputPort: number, outputPort: number) {
        this.input = new Input(inputPort)
        this.output = new Output(outputPort)

        this.pages = new Collection()
        
        this.name = name

        this.input.on('message', (message) => {
            this.getCurrentPage().handleMessage(message, this.output)
        })
    }

    private getCurrentPage() {
        return this.pages.get(this.currentPage)
    }

    public getInputName() {
        return this.input.getPortName()
    }
    public getOutputName() {
        return this.output.getPortName()
    }

    public setButton(page: string, button: number, action: Button) {
        const _page = this.pages.get(page)
        _page.buttons.set(button, action)
        this.pages.set(page, _page)
        _page.setup()
    }
    public createPage(name: string) {
        this.pages.set(name, new Page(name))
    }
    public setPage(page: Page) {
        this.pages.set(page.name, page)
    }
    public changePage(name: string) {
        this.currentPage = name
        this.pages.get(name).setup()
    }
}