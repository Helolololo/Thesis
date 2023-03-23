export interface CommandOutcome {
    success: boolean;
    message?: string;
}

export interface Command {
    command: string;
    args?: string[];
    handler: (args?: any[]) => Promise<CommandOutcome>;
}

export interface DefaultAdapterOptions {
    name: string;
    commands: string[];
    authorization: string;
    specifications: { [key: string]: any };
}

export type AdapterOptions = { [key: string]: any } & DefaultAdapterOptions;

export abstract class Adapter {
    protected readonly ops: AdapterOptions;

    public constructor(ops: AdapterOptions) { this.ops = ops; }

    public async handleCommand(wantedCommand: string, args?: string[]): Promise<CommandOutcome> {
        const commands = this.getAcceptedCommands();

        // check if command exists in adapter
        const command = commands.find((c) => c.command === wantedCommand);

        // execute handler
        if (command) {
            return await command.handler(args);
        }

        return { success: false, message: "Command not found" };
    }

    public getAcceptedRobots(): string[] {
        return [this.ops.name];
    }

    public getAcceptedCommands(): Command[] {
        const supportedCommands = this.supportedCommands();

        // filter to commands that are enabled
        // now this is just the commands enabled for this robot based on provided options.
        return supportedCommands.filter(v => this.ops.commands.includes(v.command));

    }

    // all supported commands of the adapter
    protected abstract supportedCommands(): Command[];
}
