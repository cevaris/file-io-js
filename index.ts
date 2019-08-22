import * as program from 'commander';
import { readFile } from './src/readFile';
import { writeToFile } from './src/writeToFile';
import { numberFile } from './src/numberFile';

// const cmd = process.argv[2];
// if (cmd == 'write') {
//     const file = process.argv[3];
//     const contents = process.argv[4];
//     writeToFile(file, contents);
// } else if (cmd == 'read') {
//     const file = process.argv[3];
//     readFile(file);
// } else {
//     program.outputHelp();
// }

program
    .command('write <file> <content>')
    .description('write contents to a file')
    .action(writeToFile);

program
    .command('read  <file>')
    .description('read to file')
    .action(readFile);

program
    .command('numberFile <file>')
    .description('increment/decrement a number in a file')
    .option('-i --increment', 'increment value')
    .option('-d --decrement', 'decrement value')
    .action((file, p) => {
        if (p.increment && p.decrement) {
            console.error('either increment or decrement can be invoked, not both');
            program.outputHelp();
        }

        numberFile(file, p.increment, p.decrement);
    });


program.parse(process.argv);

//  prints help message if no command is provided
if (process.argv[2] === undefined) {
    program.outputHelp();
}