
import * as fs from 'fs';
import * as path from 'path';

export async function importModules(directoryPath: string) {
    try {
        const relativePath = `${__dirname}\\${directoryPath}`;
        // Read all .ts files in the directory
        const files = await fs.promises.readdir(relativePath);

        let adapters = [];

        // Loop through each file
        for (const file of files) {
            // Check if the file is a .js file
            if ((path.extname(file) === '.ts' || path.extname(file) === '.js') && !file.startsWith("_")) {
                // Import the module
                const module = await import(`${relativePath}/${file.slice(0, -3)}`);
                console.log(module);
                // Use the imported module here
                // ...
                adapters.push(new module["default"]());
            }
        }

        return adapters;
    } catch (err) {
        console.error(err);
    }
}

// Call the function and pass in the directory path
importModules('adapter');



