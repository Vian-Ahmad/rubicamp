class Tyre {
    constructor(brand, size) {
        this.brand = brand
        this.size = size
    }

}

class Car extends Tyre {
    constructor(brand, size, varian, seat, door, warranty, year, sn) {
        super(brand, size)
        this.varian = varian
        this.seat = seat
        this.door = door
        this.warranty = warranty
        this.year = year
        this.sn = sn
    }

    static serialNumber(){
        let kata = ''
        let random = ''
        let nomorAcak = ''
        let kamus = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        for (let i = 0; i <= 36 ; i++){ 
            random = Math.floor(Math.random()* kamus.length)
            kata = kamus[random]
            if (i == 8 || i == 13 || i == 18 || i == 23 ){
                random = i
                kata = '-'
            }
        nomorAcak += kata 
                
        
        }
        return nomorAcak
    }

}

class Agya extends Car { }
class Rush extends Car { }

class CarFactory {
    constructor() {
        this.Cars = []
    }

    produce(year) {
        for (let i = 0; i < Math.floor(Math.random() * 12); i++) {
            this.Cars.push(
                new Agya('dunlop', 15, 'Agya', 5, 5, 1, year, Car.serialNumber())
            )
        }
        for (let i = 0; i < Math.floor(Math.random() * 12); i++) {
            this.Cars.push(
                new Rush('Bridgestone', 17, 'Rush', 5, 5, 3, year, Car.serialNumber())
            )
        }
        return this.Cars
    }

    result() {
        console.log('Hasil Produksi :')
        let count = 1
        for (let mobil of this.Cars) {
            console.log(`
No. ${count}
varian      : ${mobil.varian}
sn          : ${mobil.sn}
door        : ${mobil.door}
seat        : ${mobil.seat} seater
tyre        : ${mobil.brand} ${mobil.size} inch
year        : ${mobil.year}
warranty    : ${mobil.warranty} year`
            )
            count++
        }
    }

    guaranteeSimulation(simulationYear) {
        console.log('hasil simulasi garansi semua mobil pada tahun 2025:')
        let count = 1
        for (let mobil of this.Cars) {
            console.log(`
No. ${count}
varian      : ${mobil.varian}
sn          : ${mobil.sn}
door        : ${mobil.door}
seat        : ${mobil.seat} seater
tyre        : ${mobil.brand} ${mobil.size} inch
year        : ${mobil.year}
warranty    : ${mobil.warranty} year`
            )

            console.log(
                mobil.year + mobil.warranty >= simulationYear
                ? `Status on ${simulationYear} this guarantee status is active`
                : `Status on ${simulationYear} this guarantee status is expired`
            )
            count++
        }
    }
}

const toyota = new CarFactory()
toyota.produce(2020)
console.log(toyota)
toyota.produce(2022)
toyota.result()
toyota.guaranteeSimulation(2025)