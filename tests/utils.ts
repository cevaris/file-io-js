import * as fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export async function mkTmpFile(content: string, callback: (fullPath: string) => void): Promise<void> {
    const filename = Math.random().toString(36).substring(2, 15) + '.tmp';
    const folder = tmpdir();
    const fullPath = join(folder, filename);

    await fs.writeFileSync(fullPath, content, {});
    await callback(fullPath);
    await fs.unlinkSync(fullPath);
}