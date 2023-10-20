if(!process.argv[2]){
    console.log('tolong sertakan nama file sebagai inputan soalnya\n')
    console.log('misalnya: node tebakan.js soal.json')
    process.exit(1);
}


const { readFileSync } = require('node:fs');

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan: ',

});

const data = JSON.parse(readFileSync(process.argv[2], 'utf-8'));
let wadah = 0
let kesalahan = 1

console.log('\nSelamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini "data.json".')
console.log('Untuk bermain, jawablah dengan jawaban yang sesuai.')
console.log('Gunakan "skip" untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n')
console.log('pertanyaan:', data[wadah].definition)

rl.prompt();

rl.on('line', (line) => {

    if (line.toString().toLowerCase() == 'skip') {
        data.push(data[wadah])
        data.splice(wadah, 1)
    } else if (line.toString().toLowerCase() == data[wadah].term.toLowerCase()) {
        console.log('Anda beruntung!\n')
        wadah++
        kesalahan = 1
    } else {
        console.log(`\nAnda Kurang Beruntung! anda telah salah ${kesalahan} kali, silahkan coba lagi.\n`)
        kesalahan++
    }

    if (wadah == data.length) {
        rl.close()
    }

    console.log('\npertanyaan:', data[wadah].definition)


    rl.prompt();
}).on('close', () => {
    console.log('Anda Berhasil!')
    process.exit(0);
});