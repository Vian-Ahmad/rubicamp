import Table from "cli-table"
import { line } from "../univApp.js"

export function tampilkanMahasiswa(mahasiswa = []){

    var table = new Table({
        head : ['NIM', 'NAMA', 'TANGGAL LAHIR', 'ALAMAT', 'KODE JURUSAN', 'NAMA JURUSAN'],
        colWidths : [15, 25, 25, 20, 15, 30]
    })
    
    mahasiswa.forEach((item) => {
        table.push([item.nim, item.namaMahasiswa, item.tanggalLahir, item.alamat, item.idJurusan, item.namaJurusan])
    })
    console.log(table.toString())
}

export function submenuMahasiswa() {
    line()

    console.log(`
    [1] Daftar Mahasiswa
    [2] cari Mahasiswa
    [3] Tambah Mahasiswa
    [4] Hapus Mahasiswa
    [5] Kembali
    \n    
    `)
    
    line()
}

export function searchMahasiswa(data) {
    line()
    console.log(`
    Detail Mahasiswa Dengan NIM '${data.nim}':
    NIM         : ${data.nim}
    Nama        : ${data.namaMahasiswa}
    Alamat      : ${data.alamat}
    Jurusan     : ${data.idJurusan}
    `)
}
