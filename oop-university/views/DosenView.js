import Table from 'cli-table'
import { line } from '../univApp.js'


export function tampilkanDosen(dosen = []) {

    var table = new Table({
        head: ['NIP', 'NAMA DOSEN'],
        colWidths: [10, 25]
    })

    dosen.forEach((item) => {
        table.push([item.nip, item.nama])
    })
    console.log(table.toString())
}

export function submenu() {
    line()
    console.log(`
Silahkan Pilih Opsi Dibawah Ini :
 [1] Daftar Dosen
 [2] Cari Dosen
 [3] Tambah Dosen
 [4] Hapus Dosen
 [5] Kembali
 \n`)
    line()
}

export function searchDosen(data) {
    line()
    console.log(`
    Detail Dosen dengan kode '${data.nip}':
    NIP           : ${data.nip}
    Nama Dosen    : ${data.nama}
    `)
}