function pola(str){
    let newArr = str.split(' ');
    let result = [];
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            

        
        if (newArr[0].replace('#', i) * newArr[2] == newArr[4].replace('#', j)){
            result.push(i, j);
        }
    }
        
    }
    return result;

}

console.log(pola("42#3 * 188 = 80#204")) 
console.log(pola("8#61 * 895 = 78410#5"));