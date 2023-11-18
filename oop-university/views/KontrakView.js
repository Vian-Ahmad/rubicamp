import Table from "cli-table"
import { line } from "../univApp.js"

export function submenuKontrak() {

    console.log(`
    [1] Daftar Kontrak
    [2] cari Kotrak
    [3] Tambah Kontrak
    [4] Hapus Kontrak
    [5] Update Kontrak
    [6] Kembali
    `)
    line()
}

export function tampilkanKontrak(kontrak = []) {

    var table = new Table({
        head: ['ID', 'NIM', 'NAMA', 'MATA KULIAH', 'DOSEN', 'NILAI'],
        colWidths: [5, 10, 30, 30, 30, 10]
    })
    kontrak.forEach((item) => {
        table.push([item.id, item.nim, item.namaMahasiswa, item.namaMk, item.nama, item.nilai ? item.nilai : ""])
    })
    console.log(table.toString())
}

export function tableHasil(kontrak = []) {
    var table = new Table({
        head: ['ID', 'MATA KULIAH', 'DOSEN', 'NILAI'],
        colWidths: [5, 30, 20, 8]
    })

    kontrak.forEach((item) => {
        table.push([item.id, item.namaMk, item.nama, item.nilai ? item.nilai : ""])
    })
    console.log(table.toString())
}

export function listKontrak(kontrak = []) {
    var table = new Table({
        head: ['ID', 'MATA KULIAH', 'NILAI'],
        colWidths: [5, 30, 8]
    })

    kontrak.forEach((item) => {
        table.push([item.id, item.namaMk, item.nilai ? item.nilai : ""])
    })
    console.log(table.toString())
 
}

export function tbNilaiMhs(kontrak = []) {
    var table = new Table({
        head: ['ID', 'NIM', 'MATA KULIAH', 'DOSEN', 'NILAI'],
        colWidths: [5, 8, 30, 25, 10]
    })
        kontrak.forEach((item) => {
        table.push([item.id, item.nim, item.namaMk, item.nama, item.nilai ? item.nilai : ""])
    })
    console.log(table.toString())
}

export function showMataKlh(matakuliah = []){
    
    var table = new Table({
        head : ['KODE MATKUL', 'MATA KULIAH', 'SKS'],
        colWidths : [20, 30, 5]
    })
    matakuliah.forEach((item) => {
        table.push([item.idMatkul, item.namaMk, item.sks])
    })
    console.log(table.toString())
}

