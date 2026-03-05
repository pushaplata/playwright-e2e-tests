import { test } from '@playwright/test';
import chalk from 'chalk';

type Level = 'log'| 'info' | 'warn' | 'error';

export async function log(level:Level, message:string) {
    const plainLine = `[${level.toUpperCase()}] ${message}`;
    let colorLine = plainLine

    switch(level) {
        case 'log':
            colorLine = chalk.white(plainLine);
            break;
        case 'info':
            colorLine = chalk.blue(plainLine);
            break;
        case 'warn':
            colorLine = chalk.yellow(plainLine);
            break;
        case 'error':
            colorLine = chalk.red(plainLine);
            break;

    }  
    //Print colored  text to console
    (console[level] || console.log)(colorLine);
     
    //Attach plain text to the Allure
    await test.step(plainLine, async () => {});
}
