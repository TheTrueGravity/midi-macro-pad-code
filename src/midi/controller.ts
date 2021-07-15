import { Input, Output } from "./midi";

export class controller {
    private input: Input
    private output: Output

    constructor (name: string, inputPort: number, outputPort: number) {
        this.input = new Input(inputPort)
        this.output = new Output(outputPort)
    }
}