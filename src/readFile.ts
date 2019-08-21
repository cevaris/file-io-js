import * as fs from 'fs';

function readFile(filename: string): void {
    fs.readFile(filename, 'utf8', function (err, contents) {
        if (!err) {
            console.log(contents);
        } else {
            console.error(err);
        }
    });
}

export { readFile };