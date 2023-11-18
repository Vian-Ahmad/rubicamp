import { db } from "../Penghubung.js"

export default class MataKuliah {
    constructor({ idMatkul, namaMk, sks }) {
        this.idMatkul = idMatkul
        this.namaMk = namaMk
        this.sks = sks
    }

    save() {
        db.run('INSERT INTO matakuliah VALUES (?, ?, ?)', [this.idMatkul, this.namaMk, this.sks], (err, data) => {
            if (err) console.log(err)
            else (data)
        })
    }

    static read() {
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM matakuliah', (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })

        })
    }

    static search(idMatkul) {
        return new Promise(function (resolve, reject) {
            db.get('SELECT * FROM matakuliah WHERE idMatkul = ?', [idMatkul], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    static add(idMatkul, namaMk, sks) {
        const dosen = new MataKuliah({ idMatkul: idMatkul, namaMk: namaMk, sks: sks })
        return dosen.save()
    }
    
    static delete(idMatkul) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM matakuliah WHERE idMatkul = ?', [idMatkul], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })     
    }
}