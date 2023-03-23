import { Adapter, AdapterOptions, Command } from "../../AdapterTemplate";
import * as net from 'net';

const host = "192.168.2.1";
const port = 40923;

export default class Robomaster extends Adapter {
    constructor(ops: AdapterOptions) { super(ops) }

    supportedCommands(): Command[] {
        return [
            {
                command: "moveForward",
                args: [],
                handler: async (args) => {
                    try {
                        await this.sendMoveForwardCommand(args[1]);

                        return {
                            success: true,
                            message: "Moved",
                        };
                    } catch (e) {
                        return {
                            success: false,
                            message: e.message || "Could not move",
                        };
                    }
                },
            },
        ];
    }

    connect(): net.Socket {
        const s = new net.Socket();
        const address = { host, port };

        s.connect(address, () => {
            console.log("Connected to Robomaster");
        });

        return s;
    }

    disconnect(s: net.Socket) {
        // Disconnect the port connection.
        s.end();
    }

    sdk_cmd(s: net.Socket, msg: string) {
        const cmd = msg;
        // Send control commands to the robot.
        s.write(cmd, 'utf-8');

        s.on('data', (buf) => {
            if (buf.length) {
                console.log(buf.toString('utf-8'));
            } else {
                // If buf is empty, continue waiting for data.
                return;
            }
        });

        s.on('error', (e) => {
            console.log("Error receiving :", e);
            process.exit(1);
        });
    }

    sendMoveForwardCommand(distance: number, direction?: number) {
        const s = this.connect();

        // Enter sdk mode control
        this.sdk_cmd(s, "command;");

        let x = distance;
        let y = 0;
        let z = direction * 10;

        if (z == undefined) {
            z = 0;
        }

        const msg = `chassis move x ${x} y ${y} z ${z};`;
        this.sdk_cmd(s, msg);

        this.disconnect(s);
    }


}