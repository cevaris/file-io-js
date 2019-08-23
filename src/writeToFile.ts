import * as fs from 'fs';
import * as util from 'util';

const writeFilePromise = util.promisify(fs.writeFile);

async function writeToFile(filename: string, content: string): Promise<void> {
    return await writeFilePromise(filename, content, {});
}

export { writeToFile };