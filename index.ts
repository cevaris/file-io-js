import * as program from 'commander';
import { writeToFile } from './src/writeToFile';

program
    .option('-w, --write', 'write to file')
    .option('-r, --read', 'read from file')
    .option('-i, --increment', 'increment value file')

program.parse(process.argv);

if (program.write) {
    writeToFile('[file]', '[content]');
} else {
    console.log('invalid command');
    program.outputHelp();
}