function deretKaskus (n){
    
    let basket = []
    
    for (let i = 1; i <= n; i++){
        basket.push(i*3)  
    }
    for (let j = 0; j <= basket.length; j++){
       if (basket[j] % 5 === 0 && basket[j] % 6 === 0){
        basket[j] = "KASKUS"
       } else if (basket[j] % 5 === 0){
        basket[j] = "KAS"
       } else if (basket[j] % 6 === 0){
        basket[j] = "KUS"
       }

       } 
    
    return basket; 
}

console.log(deretKaskus(10));