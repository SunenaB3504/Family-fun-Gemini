const fs = require('fs');
const path = require('path');

// Paths to delete
const pathsToDelete = [
    path.join(__dirname, 'src', 'app'),
    path.join(__dirname, 'src', 'main.ts'),
    path.join(__dirname, 'angular.json')
];

// Function to delete a directory recursively
function deleteFolderRecursive(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // Recursive call
                deleteFolderRecursive(curPath);
            } else {
                // Delete file
                fs.unlinkSync(curPath);
                console.log(`Deleted file: ${curPath}`);
            }
        });
        fs.rmdirSync(directoryPath);
        console.log(`Deleted directory: ${directoryPath}`);
    }
}

// Delete the specified paths
pathsToDelete.forEach(pathToDelete => {
    if (fs.existsSync(pathToDelete)) {
        if (fs.lstatSync(pathToDelete).isDirectory()) {
            deleteFolderRecursive(pathToDelete);
        } else {
            fs.unlinkSync(pathToDelete);
            console.log(`Deleted file: ${pathToDelete}`);
        }
    } else {
        console.log(`Path does not exist: ${pathToDelete}`);
    }
});

console.log('Angular cleanup completed');
