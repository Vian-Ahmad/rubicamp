function stringManipulation(word) {

    if (word.charAt(0).match(/[aiueo]/i)){
        console.log(word)
    } else {
        console.log(word.slice(1).concat(word.charAt(0)) + 'nyo')
    }

}

stringManipulation('ayam');
stringManipulation('bebek');