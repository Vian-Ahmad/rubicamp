import Table from "cli-table"
import { line } from "../univApp.js"

export function tampilkanMk(matakuliah = []){
    
    var table = new Table({
        head : ['ID MATA KULIAH', 'MATA KULIAH', 'SKS'],
        colWidths : [20, 30, 5]
    })
    matakuliah.forEach((item) => {
        table.push([item.idMatkul, item.namaMk, item.sks])
    })
    console.log(table.toString())
}

export function submenuMk() {
    line()
    console.log(`
Silahkan Pilih Opsi Dibawah Ini :
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali
\n
`)
line()
}

export function searchMk(data) {
    line()
    console.log(`
    Detail Mata Kuliah dengan Kode Mata Kuliah '${data.idMatkul}':
    Kode Mata Kuliah    : ${data.idMatkul}
    Nama Mata Kuliah    : ${data.namaMk}
    SKS                 : ${data.sks}
    `)
}
