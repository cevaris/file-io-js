import { writeToFile } from '../writeToFile';
import { mkTmpFileName, readTestFile, unlinkTestFile } from '../../tests/utils';

let testFileName: string = '';

beforeEach(() => {
    testFileName = mkTmpFileName();
});

afterEach(async () => {
    await unlinkTestFile(testFileName);
});

test('write to a non existing file', async () => {
    const testData = 'some test data';

    await writeToFile(testFileName, testData);
    const actual = await readTestFile(testFileName);
    expect(actual).toEqual(testData);
});

test('write to the same file twice', async () => {
    const testData1 = 'some test data';
    const testData2 = 'some other test data';

    await writeToFile(testFileName, testData1);
    const actual1 = await readTestFile(testFileName);
    expect(actual1).toEqual(testData1);

    await writeToFile(testFileName, testData2);
    const actual2 = await readTestFile(testFileName);
    expect(actual2).toEqual(testData2);
});