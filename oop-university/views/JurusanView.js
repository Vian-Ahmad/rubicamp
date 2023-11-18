import Table from "cli-table"
import { line } from "../univApp.js"

export function tampilkanJurusan(jurusan = []) {

    var table = new Table({
        head : ['KODE JURUSAN', 'NAMA JURUSAN'],
        colWidths : [20, 30]
    })
    
    jurusan.forEach((item) => {
        table.push([item.idJurusan, item.namaJurusan])
    })
    console.log(table.toString())
}

export function submenuJurusan() {
    line()
    console.log(`
    [1] Daftar Jurusan
    [2] cari Jurusan
    [3] Tambah Jurusan
    [4] Hapus Jurusan
    [5] Kembali
    \n`)
    line()
}

export function searchJurusan(data) {
    line()
    console.log(`
    Detail Jurusan dengan kode '${data.idJurusan}':
    Kode Jurusan  : ${data.idJurusan}
    Nama Jurusan  : ${data.namaJurusan}
    `)
}
