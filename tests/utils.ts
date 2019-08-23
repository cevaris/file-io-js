import * as fs from 'fs';
import * as util from 'util';
import { tmpdir } from 'os';
import { join } from 'path';

/**
 * Create a tmp file, do something with it, and have it self delete.
 * @param content String to initialize the file with. 
 * @param callback Callback to wrap the tmp file fixture.
 */
export async function mkTmpFile(content: string, callback: (fullPath: string) => void): Promise<void> {
    const filename = Math.random().toString(36).substring(2, 15) + '.tmp';
    const folder = tmpdir();
    const fullPath = join(folder, filename);

    await util.promisify(fs.writeFile)(fullPath, content, {});
    await callback(fullPath);
    await util.promisify(fs.unlink)(fullPath);
}