import * as fs from 'fs';
import * as util from 'util';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { file } from '@babel/types';

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const unlinkPromise = util.promisify(fs.unlink);
const existsPromise = util.promisify(fs.exists);

export function mkTmpFileName(): string {
    const filename = Math.random().toString(36).substring(2, 15) + '.tmp';
    const folder = tmpdir();
    return join(folder, filename);
}

export async function readTestFile(filename: string): Promise<string> {
    return await readFilePromise(filename, { encoding: 'utf8' });
}

export async function writeTestFile(fileName: string, content: string): Promise<void> {
    return await writeFilePromise(fileName, content, {});
}

export async function unlinkTestFile(fileName: string): Promise<void> {
    const fileExists = await existsPromise(fileName);
    if (fileExists) {
        return await unlinkPromise(fileName);
    }
}