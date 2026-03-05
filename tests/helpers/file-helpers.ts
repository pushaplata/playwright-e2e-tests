
import fs from 'fs';
import path from 'path';
import {parse} from 'csv-parse/sync'
import { log } from 'console';

/** Read CSV file
 * @param filePath - The path to the CSV file to be read.
 * @returns An array of objects representing the parsed CSV data.
 */
function readCSVFile(filePath: string) : any [] {

    //Read a file
    const csvDataStr = fs.readFileSync(filePath, 'utf-8')

    // Parse the csv data -> Array of the data (install csv-parse)
    const csvDataArr = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true

})

return csvDataArr;

}

/** Write to target file. If target is JSOn strtingfy the data 
 * @param filePath - Full Path
 * @param data - The data to be written to the file.
 */
function writeFile(filePath: string, data: string) {
    try{
         fs.writeFileSync(filePath, data);
         log("info", `Writing file: ${filePath}...`);
    }
    catch(err) {
          new Error(`Error writing file: ${filePath}, ${err}`);
    }
}
   


export default {readCSVFile, writeFile};
