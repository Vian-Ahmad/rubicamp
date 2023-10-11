function indexPrime(param1) {

    let result = [];
    let prima = 2;

    while (result.length < param1) {
        var confirm = true;

        for (let i = 2; i <= Math.sqrt(prima); i++) {
            if (prima % i === 0) {
                confirm = false;
            }
        }
        if (confirm) 
         {
            result.push(prima);
        }

        prima++; 
    }
    
    return result[result.length - 1];
}

   

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));
