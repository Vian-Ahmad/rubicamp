import DosenChannel from "./controllers/DosenCtr.js";
import JurusanChannel from "./controllers/JurusanCtr.js";
import KontrakChannel from "./controllers/KontrakCtr.js";
import MasukAkun from "./controllers/LoginCtr.js";
import MahasiswaChannel from "./controllers/MahasiswaCtr.js";
import MatkulChannel from "./controllers/MatkulCtr.js";
import { rl } from "./Penghubung.js";



export function line() {
    let baris = "";
    for (let i = 0; i < 130; i++) baris += "=";
    return console.log(baris)
}


export function Mulai() {
    line()
    console.log("Welcome to Universitas Pendidikan Indonesia\nJl. Setiabudi No. 255")
    line()
    MasukAkun.izin()
    
}




export function mainMenu() {
    line()
    console.log(`
Silahkan pilih opsi dibawah ini :
=================================
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `)
    line()
    rl.question("Masukkan salah satu nomor dari opsi diatas : ", (index) => {
        switch (index) {
            case "1":
                MahasiswaChannel.menuMahasiswa()
                break;
            case "2":
                JurusanChannel.menuJurusan()
                break;
            case "3":
                DosenChannel.menuDosen()
                break;
            case "4":
                MatkulChannel.menuMk()
                break;
            case "5":
                KontrakChannel.menuKontrak()
                break;
            default:
                Mulai()
                break;
        }
    })
}

Mulai()