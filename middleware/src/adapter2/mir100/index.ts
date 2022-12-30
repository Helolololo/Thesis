/* Created 28.12.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { Adapter, Command } from "../../adapterTemplate";

export default class MirAdapter extends Adapter {
    constructor() {
        super();
    }

    getAcceptedRobots(): string[] {
        return ["mir100"];
    }

    getAcceptedCommands(): Command[] {
        return [
            {
                command: "move",
                args: ["forward"],
                handler: async (args) => {
                    // send command to move forward
                    // const outcome: any = await this.sendCommandToRest();

                    // if (outcome.isOk())

                    //     return {
                    //         success: true,
                    //         message: "Moved forward",
                    //     };
                    // else
                    return {
                        success: false,
                        message: "Could not move forward",
                    };
                },
            },
        ];
    }

    recvFromRest() {
        // adapter specific: recv a command from the rest api

        // adapter specific:  process response into intention

        // call the standard handleCommand function
        this.handleCommand("move");
    }

    async sendCommandToRest() {
        // api specific: send command to rest api
    }
}