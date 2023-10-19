const { readFileSync } = require('node:fs');

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan: ',

});

const data = JSON.parse(readFileSync('data.json', 'utf-8'));
let wadah = 0

console.log('Selamat datang di permainan Tebak kata, silahkan isi jawaban dengan benar ya!')
console.log('pertanyaan:', data[wadah].definition)

rl.prompt();

rl.on('line', (line) => {
    if (line.toString().toLowerCase() == data[wadah].term.toLowerCase()) {
        console.log('selamat anda benar!\n')
        wadah++
    } else {
        console.log('wkwkwk, anda kurang beruntung!\n')
    }
    if (wadah == data.length) {
        rl.close()
    }

    console.log('pertanyaan:', data[wadah].definition)
    

    rl.prompt();
}).on('close', () => {
    console.log('Hore anda menang!')
    process.exit(0);
});

