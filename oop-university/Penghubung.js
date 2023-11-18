import path from 'path';
import readline from 'readline';
import sqlite3 from 'sqlite3';


const __dirname = path.resolve()
const jalurdb = path.join(__dirname, 'db', 'university.db')

export const db = new sqlite3.Database(jalurdb)

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})