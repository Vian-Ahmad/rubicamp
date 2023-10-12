function sentenceManipulation(sentence){

    let pisahanKata = sentence.split(' ');
    let dirubahAr = [];
    for (let i = 0; i < pisahanKata.length; i++){
        if (pisahanKata[i].charAt(0).match(/[aiueo]/i)){
            dirubahAr.push(pisahanKata[i])          
        } else {
            dirubahAr.push(pisahanKata[i].slice(1).concat(pisahanKata[i].charAt(0)) + 'nyo')
        };
    };
    console.log(dirubahAr.join(' ')); 

};

sentenceManipulation("ibu pergi ke pasar bersama aku")

