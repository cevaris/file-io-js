import { numberFile } from '../numberFile';
import { mkTmpFileName, readTestFile, unlinkTestFile } from '../../tests/utils';
import logger from '../logger';

let infoLogMock: jest.SpyInstance<void, [string]>;
let errorLogMock: jest.SpyInstance<void, [Error]>;
let testFileName: string = mkTmpFileName();

beforeEach(() => {
    infoLogMock = jest.spyOn(logger, 'info').mockImplementation();
    errorLogMock = jest.spyOn(logger, 'error').mockImplementation();
});

afterEach(async () => {
    jest.restoreAllMocks();
    testFileName = mkTmpFileName();
    await unlinkTestFile(testFileName);
})

test('increment non-existing file', async () => {
    await numberFile(testFileName, true, false);

    const actual = await readTestFile(testFileName);
    expect(actual).toEqual('1');

    expect(infoLogMock).toHaveBeenCalledTimes(1);
    expect(infoLogMock).toHaveBeenCalledWith(`updated ${testFileName} by 1`);

    expect(errorLogMock).toHaveBeenCalledTimes(0);
});

test('decrement non-existing file', async () => {
    await numberFile(testFileName, false, true);

    const actual = await readTestFile(testFileName);
    expect(actual).toEqual('-1');

    expect(infoLogMock).toHaveBeenCalledTimes(1);
    expect(infoLogMock).toHaveBeenCalledWith(`updated ${testFileName} by -1`);

    expect(errorLogMock).toHaveBeenCalledTimes(0);
});

test('increment then decrement a number file', async () => {
    await numberFile(testFileName, false, true);
    const actualFirstRead = await readTestFile(testFileName);
    expect(actualFirstRead).toEqual('-1');

    await numberFile(testFileName, true, false);
    const actualSecondRead = await readTestFile(testFileName);
    expect(actualSecondRead).toEqual('0');
});