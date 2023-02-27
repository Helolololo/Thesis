import * as fs from 'fs';
import * as path from 'path';
import { Adapter } from './AdapterTemplate';
import { processConfigs } from './LoadConfiguration';

export async function importModules(directoryPath: string) {
    try {
        const relativePathAdapter = `${__dirname}\\${directoryPath}`;
        let relativePath;
        // Read all folders and files in the directory
        const folders = await fs.promises.readdir(relativePathAdapter);

        let adapters = [];

        const possibleAdaptersList = {};

        // Loop through each folder inside the adapter folder to find the index.ts file (adapter) for every mobile robot
        for (const folder of folders) {

            // Check for other folders in the adapter folder. if extname returns an empty string, it is another folder
            if (path.extname(folder) === "") {
                // Find the index.ts or index.js filde in each oth those folders
                // This file is the adapter for different mobile robots

                relativePath = `${relativePathAdapter}\\${folder}`;

                // Read all folders and files in the directory
                const files = await fs.promises.readdir(relativePath);

                // Loop through each siles inside the folder within the adapter folder to find the index.ts file (adapter) for every mobile robot
                for (const file of files) {
                    if (path.basename(file) === "index.ts" || path.basename(file) === "index.js") {
                        // Import the module
                        const { default: module } = await import(`${relativePath}`);
                        console.log("module:", module);

                        possibleAdaptersList[folder] = module;
                    }
                }
            }
        }

        return processConfigs(possibleAdaptersList, "configuration");
    } catch (err) {
        console.error(err);
    }
}



