// Starting point of this code is written by / with help of https://github.com/comradealeks
// But changed some parts of it to suit my needs
const { errorMonitor } = require('events');
const fs = require('fs')
const path = require('path');
const { stringify } = require('querystring');

// Helper function to sanitize a file name, removing any space before ".png"
function sanitizeFileName(fileName) {
    return fileName.trim().replace(/\s+\.png$/, '.png');
}

// Helper function to recursively search for a file in a directory and its subdirectories (case-insensitive, space-trimming)
function findFileRecursively(directory, fileName) {
    const files = fs.readdirSync(directory);

    // Sanitize the input fileName to remove space before ".png"
    const sanitizedFileName = sanitizeFileName(fileName).toLowerCase();

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // If the current item is a directory, search within it
            const foundFile = findFileRecursively(fullPath, sanitizedFileName);

            if (foundFile) {
                return foundFile; // Return the file if found in the subdirectory
            }
        } else if (stat.isFile()) {
            // Sanitize the actual file name in the directory
            const sanitizedActualFile = sanitizeFileName(file).toLowerCase();

            if (sanitizedActualFile === sanitizedFileName) {
                return fullPath;
            }
        }
    }

    // If no file is found, return null
    return null;
}

async function GetItems() {
    try {
        const response = await fetch('http://localhost:3000/api/items', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return (await response.json());
    }
    catch (error) {
        console.error(error)
    }
    return null;
}

AddImgToItems();
async function AddImgToItems() {
    const Items = await GetItems();

    const imagesFolder = path.join(__dirname, 'Item Icons');

    for (const item of Items) {
        // let iconName = `${item.Name}.png`.replaceAll("'", "_")
        const iconName = `${item.Name}.png`

        const iconPath = findFileRecursively(imagesFolder, iconName);
        console.log(iconPath)
        let iconData = null;

        // if (iconPath && fs.existsSync(iconPath)) {
        //     // Read the PNG file and convert it to binary data
        //     iconData = fs.readFileSync(iconPath);
        //     item.Img = iconData;
        //     JSONItem = JSON.stringify(item);

        //     try {
        //         const response = await fetch('http://localhost:3000/api/items', {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSONItem,
        //         })
        //         if (!response.ok) {
        //             throw new Error(`Response status: ${response.status}`)
        //         }
        //         console.log(`Added img to ${item.Name} in DB`)
        //         return (await response.json());
        //     }
        //     catch (error) {
        //         console.error(error)
        //     }
        // } else {
        //     console.warn(`Icon file ${iconName} not found. Skipping the icon for ${item.Name}.`);
        // }
    }
}


// Function to read and insert data from blocks_output.json file into the database
async function insertDataFromJSON() {
    try {
        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync('blocks_output.json', 'utf8'));

        // Loop through each block in the JSON array
        for (const block of jsonData) {
            // Prepare a fresh SQL request object for each block
            const blockRequest = new sql.Request();

            // Sanitize the Icon field in the JSON to remove any space before ".png"
            const sanitizedIconName = sanitizeFileName(block.Icon);

            // Search for the PNG file associated with the block in the 'images' folder recursively
            const imagesFolder = path.join(__dirname, 'images'); // Root 'images' folder
            const iconPath = findFileRecursively(imagesFolder, sanitizedIconName); // Recursively find the icon
            let iconData = null;

            if (iconPath && fs.existsSync(iconPath)) {
                // Read the PNG file and convert it to binary data
                iconData = fs.readFileSync(iconPath);
            } else {
                console.warn(`Icon file ${block.Icon} not found. Skipping the icon for ${block.DisplayName}.`);
            }

            // Insert BlockInfo into the database
            const insertBlockInfoQuery = `
                INSERT INTO BlockInfo (FileName, TypeID, SubtypeID, DisplayName, CubeSize, Icon, SizeX, SizeY, SizeZ)
                VALUES (@FileName, @TypeID, @SubtypeID, @DisplayName, @CubeSize, @Icon, @SizeX, @SizeY, @SizeZ);
            `;

            blockRequest.input('FileName', sql.NVarChar, block.FileName);
            blockRequest.input('TypeID', sql.NVarChar, block.TypeID);
            blockRequest.input('SubtypeID', sql.NVarChar, block.SubtypeID);
            blockRequest.input('DisplayName', sql.NVarChar, block.DisplayName);
            blockRequest.input('CubeSize', sql.NVarChar, block.CubeSize);
            blockRequest.input('Icon', sql.VarBinary, iconData);  // Insert binary data for the Icon (PNG)
            blockRequest.input('SizeX', sql.Int, block.Size.X);
            blockRequest.input('SizeY', sql.Int, block.Size.Y);
            blockRequest.input('SizeZ', sql.Int, block.Size.Z);

            // Execute the insert query for block information
            await blockRequest.query(insertBlockInfoQuery);
            console.log(`Inserted BlockInfo for DisplayName: ${block.DisplayName}`);

            // Insert Components into the database for the current block
            const insertComponentQuery = `
                INSERT INTO ComponentList (DisplayName, CubeSize, ComponentName, Quantity)
                VALUES (@DisplayName, @CubeSize, @ComponentName, @Quantity);
            `;

            for (const component of block.Components) {
                // Skip inserting if the component is empty or zero
                if (!component.quantity || component.quantity === '' || component.quantity === 0) continue;

                const componentRequest = new sql.Request();
                componentRequest.input('DisplayName', sql.NVarChar, block.DisplayName);
                componentRequest.input('CubeSize', sql.NVarChar, block.CubeSize);
                componentRequest.input('ComponentName', sql.NVarChar, component.name);
                componentRequest.input('Quantity', sql.Int, component.quantity);

                // Execute the insert query for each valid component
                await componentRequest.query(insertComponentQuery);
                console.log(`Inserted component ${component.name} for DisplayName: ${block.DisplayName}`);
            }
        }

    } catch (error) {
        console.error('Error inserting data from JSON:', error);
    }
}

