export interface CommandOutcome {
    success: boolean;
    message?: string;
}

export interface Command {
    command: string;
    args?: string[];
    handler: (args?: string[]) => Promise<CommandOutcome>;
}

export abstract class Adapter {
    public constructor() { }

    public async handleCommand(wantedCommand: string, args?: string[]): Promise<CommandOutcome> {
        const commands = this.getAcceptedCommands();

        // check if command exists
        const command = commands.find((c) => c.command === wantedCommand);

        // execute handler
        if (command) {
            return await command.handler(args);
        }

        return { success: false, message: "Command not found" };
    }

    public abstract getAcceptedRobots(): string[];
    public abstract getAcceptedCommands(): Command[];
}
