
import * as fs from 'fs';
import * as path from 'path';

export async function importModules(directoryPath: string) {
    try {
        const relativePathAdapter = `${__dirname}\\${directoryPath}`;
        let relativePath;
        // Read all folders and files in the directory
        const folders = await fs.promises.readdir(relativePathAdapter);

        let adapters = [];

        console.log(folders);

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
                        const module = await import(`${relativePath}/${file.slice(0, -3)}`);
                        console.log(folder);
                        console.log(file);
                        console.log("module:", module);
                        // Use the imported module here
                        // ...
                        //adapters.push(new module["default"]());
                    }
                }
            }
        }

        return adapters;
    } catch (err) {
        console.error(err);
    }
}

// Call the function and pass in the directory path
importModules('adapter2');



