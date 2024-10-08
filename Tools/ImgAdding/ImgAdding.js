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
        let iconData = null;

        if (iconPath && fs.existsSync(iconPath)) {
            // Read the PNG file and convert it to binary data
            iconData = fs.readFileSync(iconPath);
            item.Img = iconData;
            JSONItem = JSON.stringify(item);

            try {
                const response = await fetch(`http://localhost:3000/api/items/${item.Id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        "Name": item.Name,
                        "Tier": item.Tier,
                        "Gold": item.Gold,
                        "Img": iconData,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status} Response Message: ${response.statusText}`)
                }
                console.log(`Added img to ${item.Name} in DB`)
            }
            catch (error) {
                console.error(error)
            }
        } else {
            console.warn(`Icon file ${iconName} not found. Skipping the icon for ${item.Name}.`);
        }


    }
}

// Test Function
// AddItem()
async function AddItem() {
    const Items = await GetItems();
    const item = Items[20];

    const imagesFolder = path.join(__dirname, 'Item Icons');

    // let iconName = `${item.Name}.png`.replaceAll("'", "_")
    const iconName = `${item.Name}.png`

    const iconPath = findFileRecursively(imagesFolder, iconName);
    console.log(iconPath)
    let iconData = null;

    if (iconPath && fs.existsSync(iconPath)) {
        // Read the PNG file and convert it to binary data
        iconData = fs.readFileSync(iconPath);

        try {
            const response = await fetch(`http://localhost:3000/api/items/${item.Id}`, {
                method: "PUT",
                body: JSON.stringify({
                    "Name": item.Name,
                    "Tier": item.Tier,
                    "Gold": item.Gold,
                    "Img": iconData,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status} Response Message: ${response.statusText}`)
            }
            console.log(`Added img to ${item.Name} in DB`)
        }
        catch (error) {
            console.error(error)
        }
    } else {
        console.warn(`Icon file ${iconName} not found. Skipping the icon for ${item.Name}.`);
    }
}
