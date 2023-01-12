import { Adapter, Command } from "../../AdapterTemplate";

export default class Robomaster extends Adapter {
    getAcceptedRobots(): string[] {
        return [];
    }
    getAcceptedCommands(): Command[] {
        return [];
    }
}