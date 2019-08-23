import * as fs from 'fs';
import logger from './logger';
import * as util from 'util';

async function readFile(filename: string): Promise<void> {
    await util.promisify(fs.readFile)(filename, 'utf8')
        .then(logger.info)
        .catch(logger.error);
}

export { readFile };