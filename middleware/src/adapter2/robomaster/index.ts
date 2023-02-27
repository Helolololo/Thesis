import { Adapter, AdapterOptions, Command } from "../../AdapterTemplate";

export default class Robomaster extends Adapter {
    constructor(ops: AdapterOptions) { super(ops) }

    supportedCommands(): Command[] {
        return [];
    }
}