import { db } from "../Penghubung.js"

export default class Mahasiswa {
    constructor({ nim, namaMahasiswa, tanggalLahir, alamat, idJurusan}) {
        this.nim = nim
        this.namaMahasiswa = namaMahasiswa
        this.tanggalLahir = tanggalLahir
        this.alamat = alamat
        this.idJurusan = idJurusan
    }

    save() {
        db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [this.nim, this.namaMahasiswa, this.tanggalLahir, this.alamat, this.idJurusan], (err, data) => {
            if (err) console.log(err)
            else (data)
        })
    }

    static read() {
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM mahasiswa LEFT JOIN jurusan USING(idJurusan)', (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }

    static add(nim, namaMahasiswa, tanggalLahir, alamat, idJurusan ) {
        const maha = new Mahasiswa({nim: nim, namaMahasiswa: namaMahasiswa, tanggalLahir: tanggalLahir, alamat: alamat, idJurusan: idJurusan})
        return maha.save()
    }   

    static search(nim) {
        return new Promise(function (resolve, reject) {
            db.get('SELECT * FROM mahasiswa WHERE nim = ?', [nim], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })

        })
    }

    static delete(nim) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM mahasiswa WHERE nim = ?', [nim], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })       
    }
}