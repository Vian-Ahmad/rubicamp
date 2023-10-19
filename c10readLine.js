const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'tulis kalimatmu disini > ',
});

rl.prompt();

rl.on('line', (line) => {

        let pisahanKata = line.split(' ');
        let dirubahAr = [];
        for (let i = 0; i < pisahanKata.length; i++){
            if (pisahanKata[i].charAt(0).match(/[aiueo]/i)){
                dirubahAr.push(pisahanKata[i])          
            } else {
                dirubahAr.push(pisahanKata[i].slice(1).concat(pisahanKata[i].charAt(0)) + 'nyo')
            };
        };
        console.log(dirubahAr.join(' ')); 
    
  rl.prompt();
}).on('close', () => {
  console.log('Good Bye!');
  process.exit(0);
});