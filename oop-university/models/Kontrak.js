import { db } from "../Penghubung.js"

export default class Kontrak {
    constructor({ nim, idMatkul, nip }) {
        this.nim = nim
        this.idMatkul = idMatkul
        this.nip = nip      
    }

    save() {
        db.run('INSERT INTO kontrak (nim, idMatkul, nip) VALUES (?, ?, ?)', [this.nim, this.idMatkul, this.nip], (err, data) => {
            if (err) console.log(err)
            else data
        })
    }

    static read() {
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM kontrak LEFT JOIN mahasiswa USING(nim) LEFT JOIN matakuliah USING(idMatkul) LEFT JOIN dosen USING(nip)', (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }

    static add(nim, idMatkul, nip) {
        const tambahKontrak = new Kontrak({ nim: nim, idMatkul: idMatkul, nip: nip })
        return tambahKontrak.save()
        // db.run('INSERT INTO kontrak VALUES (?, ?, ?)', [nim, idMatkul, nip], (err, data) => {
        //     if (err) console.log(err)
        //     else data
        }
    



    static searchAdd(nim, idMatkul) {
        return new Promise(function (resolve, reject) {
            db.get('SELECT * FROM kontrak WHERE nim = ? AND idMatkul = ?', [nim, idMatkul], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    static delete(id) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM kontrak WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static update(nilai, id, nim) {
        return new Promise(function (resolve, reject) {
            db.run('UPDATE kontrak SET nilai = ? WHERE id = ? AND nim = ?', [nilai, id, nim], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    // static searchUpdate(id, nim) {
    //     return new Promise(function (resolve, reject) {
    //         db.get('SELECT * FROM kontrak WHERE id = ? AND nim = ?', [id, nim], (err, data) => {
    //             if (err) reject(err)
    //             else resolve(data)
    //         })
    //     })
    // }

    static Search(nim) {
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM kontrak LEFT JOIN mahasiswa USING(nim) LEFT JOIN matakuliah USING(idMatkul) LEFT JOIN dosen USING(nip) WHERE nim = ?', [nim], (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }
}

