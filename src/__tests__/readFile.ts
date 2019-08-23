import { readFile } from '../readFile';
import { writeTestFile, mkTmpFileName, unlinkTestFile } from '../../tests/utils';
import logger from '../logger';

let infoLogMock: jest.SpyInstance<void, [string]>;
let errorLogMock: jest.SpyInstance<void, [Error]>;
let testFileName: string = '';

beforeEach(() => {
    testFileName = mkTmpFileName();
    infoLogMock = jest.spyOn(logger, 'info').mockImplementation();
    errorLogMock = jest.spyOn(logger, 'error').mockImplementation();
});

afterEach(async () => {
    jest.restoreAllMocks();
    await unlinkTestFile(testFileName);
})

test('read from an existing file', async () => {
    const testData = 'some test data';

    await writeTestFile(testFileName, testData);
    await readFile(testFileName);

    expect(infoLogMock).toHaveBeenCalledTimes(1);
    expect(infoLogMock).toHaveBeenCalledWith(testData);

    expect(errorLogMock).toHaveBeenCalledTimes(0);
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