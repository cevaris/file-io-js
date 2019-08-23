import { readFile } from '../readFile';
import { mkTmpFile } from '../../tests/utils';
import logger from '../logger';

let logMessageMock: any;

beforeEach(() => {
    logMessageMock = jest.spyOn(logger, 'logMessage').mockImplementation();
});

afterEach(() => {
    logMessageMock.mockRestore();
})

test('read from an existing file', async () => {
    const testData = 'some test data';

    await mkTmpFile(testData, async (fileName: string) => {
        await readFile(fileName);

        expect(logMessageMock).toHaveBeenCalledTimes(1);
        expect(logMessageMock).toHaveBeenCalledWith(testData);
    });
});