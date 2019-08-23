import * as fs from 'fs';
import logger from './logger';
import * as util from 'util';

const readFilePromise = util.promisify(fs.readFile);

async function readFile(filename: string): Promise<void> {
    return await readFilePromise(filename, 'utf8')
        .then(logger.info)
        .catch(logger.error);
}

export { readFile };