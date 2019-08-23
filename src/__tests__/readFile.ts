import { readFile } from '../readFile';
import { mkTmpFile } from '../../tests/utils';
import logger from '../logger';

let infoLogMock: jest.SpyInstance<void, [string]>;
let errorLogMock: jest.SpyInstance<void, [Error]>;

beforeEach(() => {
    infoLogMock = jest.spyOn(logger, 'info').mockImplementation();
    errorLogMock = jest.spyOn(logger, 'error').mockImplementation();
});

afterEach(() => {
    jest.restoreAllMocks();
})

test('read from an existing file', async () => {
    const testData = 'some test data';

    await mkTmpFile(testData, async (fileName: string) => {
        await readFile(fileName);

        expect(infoLogMock).toHaveBeenCalledTimes(1);
        expect(infoLogMock).toHaveBeenCalledWith(testData);
    });
});

test('read from file that does not exist', async () => {
    const dneFile = '/file/does/not/exist';
    await readFile(dneFile);

    expect(infoLogMock).toHaveBeenCalledTimes(0);
    expect(errorLogMock).toHaveBeenCalledTimes(1);
    
    const expectedError = `ENOENT: no such file or directory, open '${dneFile}'`;
    const error: Error = errorLogMock.mock.calls[0][0];
    expect(error.message).toEqual(expectedError);
});