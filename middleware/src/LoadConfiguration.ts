import * as fs from 'fs';
import * as path from 'path';
import { Adapter } from './AdapterTemplate';
import { connectRobot } from './InterfaceToController';
import * as process from 'process';


export async function processConfigs(possibleAdapters: { [key: string]: any }, configurationPath: string) {
    try {
        const relativePathConfiguration = `${process.cwd()}\\${configurationPath}`;
        let robots = [];

        // Read all folders and files in the directory
        const files = await fs.promises.readdir(relativePathConfiguration);

        // Loop through each files inside the folder within the config folder 
        for (const file of files) {
            if (path.extname(file) === ".json") {
                const config = JSON.parse(await fs.promises.readFile(`${relativePathConfiguration}/${file}`, {
                    encoding: "utf8"
                }));

                if (!Object.keys(possibleAdapters).includes(config.adapterName)) {
                    console.error(`No adapter found for ${config.adapterName}`);
                    continue;
                }
                const adapter = possibleAdapters[config.adapterName];

                for (const robotConfig of config.robots) {
                    // remove adaptername to only contain cobot configuration data
                    const extraOps = config;
                    delete extraOps.adapterName;
                    delete extraOps.robots;

                    const ops = {
                        ...robotConfig,
                        ...extraOps,
                    };

                    // connect to the broker for this robot
                    const id = robotConfig.name.split("_");
                    await connectRobot(id[0], id[1]);

                    robots.push(new adapter(ops));       // create an instance for every robot for the corresponding adapter defined in adapterName
                }

            }
        }

        console.log(robots);

        return robots;
    } catch (err) {
        console.error(err);
    }
}



