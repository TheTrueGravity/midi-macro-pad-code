import { Input, Output } from "./midi";
import { Collection } from '../modules/collections';

export interface action {
    name: string,
    type: 'push' | 'toggle',
    offColour: number,
    onColour: number,
    run: Function
    onPress?: Function,
    onRelease?: Function,
    onToggle?: Function
}

export interface page {
    name: string,
    buttons: Collection<number, action>,
    setup: Function
}

export class page implements page {
    public name: string
    public buttons: Collection<number, action>
    public setup: Function

    constructor(name: string) {
        this.name = name
        this.buttons = new Collection()
        this.setup = () => {}
    }

    public handleMessage(message: number[]) {
        this.buttons.get(message[0]).run(message)
    }
}

export class controller {
    private input: Input
    private output: Output
    private currentPage: string = 'main'
    private pages: Collection<string, page>

    public name: string

    constructor (name: string, inputPort: number, outputPort: number) {
        this.input = new Input(inputPort)
        this.output = new Output(outputPort)
        
        this.name = name

        this.input.on('message', (message) => {
            this.getCurrentPage().handleMessage(message)
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

    public setButton(page: string, button: number, action: action) {
        const _page = this.pages.get(page)
        _page.buttons.set(button, action)
        this.pages.set(page, _page)
    }
    public setPage(page: page) {
        this.pages.set(page.name, page)
    }
    public changePage(name: string) {
        this.currentPage = name
        this.pages.get(name).setup()
    }
}