import { Input, Output } from "./midi";

export class controller {
    private input: Input
    private output: Output

    public name: string

    constructor (name: string, inputPort: number, outputPort: number) {
        this.input = new Input(inputPort)
        this.output = new Output(outputPort)
        
        this.name = name
    }

    public getInputName() {
        return this.input.getPortName()
    }
    public getOutputName() {
        return this.output.getPortName()
    }
}