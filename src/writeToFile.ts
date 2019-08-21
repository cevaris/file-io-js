import * as fs from 'fs';

function writeToFile(filename: string, content: string): void {
    fs.writeFile(filename, content, 'utf8', (err) => {
        if (err) console.error(err);
    });
}

export { writeToFile };