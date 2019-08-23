import * as fs from 'fs';
import * as util from 'util';
import logger from './logger';

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

enum Action {
    DECREMENT = -1,
    UNKNOWN = 0,
    INCREMENT = 1,
}

async function applyAction(filename: string, action: Action): Promise<void> {
    let parsedNumber: number = 0;

    const fileExists: boolean = await exists(filename);
    if (fileExists == true) {
        // read in current number value as a string (utf8) and convert it to number
        const numberStr: string = await readFile(filename, { encoding: 'utf8' });
        parsedNumber = Number(numberStr);

        // confirm the parsedNumber is an actual number
        if (isNaN(parsedNumber)) {
            return Promise.reject(Error(`${numberStr} is not a number.`));
        }
    }

    return writeFile(filename, parsedNumber + action);
}

async function numberFile(filename: string, increment: boolean, decrement: boolean): Promise<void> {
    let action: Action = Action.UNKNOWN;
    if (increment) {
        action = Action.INCREMENT;
    }
    if (decrement) {
        action = Action.DECREMENT;
    }

    try {
        await applyAction(filename, action);
        logger.info(`updated ${filename} by ${action}`)
    } catch (err) {
        logger.error(err);
    }
}

export { numberFile };