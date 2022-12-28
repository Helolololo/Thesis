import { Command } from "../AdapterTemplate";
import MirAdapter from "./_MirAdapter"

export default class Mir100 extends MirAdapter {
    getAcceptedRobots(): string[] {
        return ["mir100"];
    }
    /*getAcceptedCommands(): Command[] {
        {
    
        }
    }*/
}