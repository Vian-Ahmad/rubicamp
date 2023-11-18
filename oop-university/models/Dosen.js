import { db } from "../Penghubung.js"

export default class Dosen {
    constructor({ nip, nama }) {
        this.nip = nip
        this.nama = nama
    }

    save() {
        db.run('INSERT INTO dosen VALUES (?, ?)', [this.nip, this.nama], (err, data) => {
            if (err) console.log(err)
            else (data)

        })
    }

    static read() {
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM dosen', (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })

        })
    }

    static search(nip) {
        return new Promise(function (resolve, reject) {
            db.get('SELECT * FROM dosen WHERE nip = ?', [nip], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    static add(nip, nama) {
        const dosen = new Dosen({ nip: nip, nama: nama })
        return dosen.save()
    }

    static delete(nip) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM dosen WHERE nip = ?', [nip], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }

            })
        })
    }
}