function wierdMultiply (sentence){

    let strBaru = sentence.toString()

    if (strBaru.length > 1){
        let result = 1
        for ( let i = 0; i < strBaru.length; i++) {
            result *= strBaru[i];        
        }   
        return wierdMultiply(result);  
    } else {
        return sentence;
    }

}

console.log(wierdMultiply(39));
console.log(wierdMultiply(999));
console.log(wierdMultiply(3));