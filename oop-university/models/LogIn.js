import { db } from "../Penghubung.js"




export default class Login {    
    constructor(userName, nomorPin, lvlUser){
        this.userName = userName
        this.nomorPin = nomorPin
        this.lvlUser = lvlUser
    }

    static readUserName(userName, next){
        db.get('SELECT * FROM account where userName = ?', [userName], (err, data) => {
            if (err) {
                console.log(err)
            }
                next(data)
        })
    }

    static readNomorPin(nomorPin, next){
        db.get('SELECT * FROM account where nomorPin = ?', [nomorPin], (err, data) => {
            if (err) {
                console.log(err)
            } 
                next(data)
        })
    }

    static readLvlUser(lvlUser, next){
        db.get('SELECT * FROM account where lvlUser = ?', [lvlUser], (err, data) => {
            if (err) {
                console.log(err)
            } else 
                next(data)
        })
    }
}

