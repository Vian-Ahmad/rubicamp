function spiral(param1) {
    let array = [];
    let hasil = [];
    let baru = 0;


    for (let i = 0; i < param1; i++) {
        array[i] = [];
        for (let j = 0; j < param1; j++) {
            array[i][j] = baru;
            baru++;
        }
    }
    let frontRow = 0;
    let frontCol = 0;
    let lastCol = param1 - 1;
    let lastRow = param1 - 1;
    while (frontRow <= lastRow && frontCol <= lastCol) {
        for (let j = frontRow; j <= lastCol; j++) {
            hasil.push(array[frontRow][j])
        }
        frontRow++
        for (let k = frontRow; k <= lastRow; k++) {
            hasil.push(array[k][lastCol]);
        }
        lastCol--

        for (let l = lastCol; l >= frontCol; l--) {
            hasil.push(array[lastRow][l]);
        }
        lastRow--

        for (let m = lastRow; m >= frontRow; m--) {
            hasil.push(array[m][frontRow]);
        }
        frontRow++
    }

    console.log(hasil);
}

spiral(5);
spiral(6);
spiral(7);