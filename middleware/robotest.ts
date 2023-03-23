import * as net from 'net';

const host = "192.168.2.1";
const port = 40923;

function main() {
    const s = connect();

    // Enter sdk mode control
    sdk_cmd(s, "command;");

    const x = 1;
    const y = 0;
    const z = 0;

    const msg = `chassis move x ${x} y ${y} z ${z};`;
    sdk_cmd(s, msg);

    disconnect(s);
}

function connect(): net.Socket {
    const s = new net.Socket();
    const address = { host, port };

    console.log("Connecting...");

    s.connect(address, () => {
        console.log("Connected!");
    });

    return s;
}

function disconnect(s: net.Socket) {
    // Disconnect the port connection.
    s.end();
}

function sdk_cmd(s: net.Socket, msg: string) {
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

if (require.main === module) {
    main();
}