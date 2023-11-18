import { db } from "../Penghubung.js"

export default class Jurusan {
    constructor({ idJurusan, namaJurusan }) {
        this.idJurusan = idJurusan
        this.namaJurusan = namaJurusan
    }

    save() {
        db.run('INSERT INTO jurusan VALUES (?, ?)', [this.idJurusan, this.namaJurusan], (err, data) => {
            if (err) console.log(err)
            else (data)
        })
    }

    static read() {
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM jurusan', (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }

    static search(idJurusan) {
        return new Promise(function (resolve, reject) {
            db.get('SELECT * FROM jurusan WHERE idJurusan = ?', [idJurusan], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    static add(idJurusan, namaJurusan) {
        const dosen = new Jurusan({ idJurusan: idJurusan, namaJurusan: namaJurusan })
        return dosen.save()
    }


    static delete(idJurusan) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM jurusan WHERE idJurusan = ?', [idJurusan], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }

            })
        })
    }

}