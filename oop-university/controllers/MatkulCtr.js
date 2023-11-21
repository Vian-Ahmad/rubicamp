import { rl } from "../Penghubung.js";
import MataKuliah from "../models/MataKuliah.js";
import { mainMenu } from "../univApp.js";
import { searchMk, submenuMk, tampilkanMk } from "../views/MataKuliahView.js";

export default class MatkulChannel {

    static menuMk() {
        submenuMk()
        rl.question(`Masukkan salah satu nomor dari opsi diatas : `, (index) => {
            switch (index) {
                case "1":
                    MatkulChannel.daftarMk()
                    break;
                case "2":
                    MatkulChannel.cariMk()
                    break;
                case "3":
                    MatkulChannel.tambahMk()
                    break;
                case "4":
                    MatkulChannel.hapusMk()
                    break;
                case "5":
                    mainMenu()
                    break;
                default:
                    console.log(`Nomor yang anda masukkan tidak sesuai, silahkan coba lagi`)
                    MatkulChannel.menuMk()
                    break;
            }
        })
    }

    static async daftarMk() {
        if (await MataKuliah.read()) {
            tampilkanMk(await MataKuliah.read())
            MatkulChannel.menuMk()
        } else {
            console.log(`Terjadi kesalahan dalam proses pemanggilan data, silahkan coba lagi`)
            MatkulChannel.menuMk()
        }
    }

    static cariMk() {
        rl.question("Masukkan Kode Mata Kuliah :", async (kode) => {
            if(await MataKuliah.search(kode)) {
                searchMk(await MataKuliah.search(kode))
                MatkulChannel.menuMk()
            } else {
                console.log(`Mata Kuliah Dengan Kode ${kode}, Tidak Terdaftar`)
                MatkulChannel.menuMk()
            }
        })
    }

    static async tambahMk() {
        console.log(`Lengkapi data dibawah ini :\n`)
        const listMk = await MataKuliah.read()
        if(listMk) {
            tampilkanMk(listMk)
            rl.question("Masukkan Kode Mata Kuliah : ", async (idMatul) => {
                rl.question("Nama Mata Kuliah : ", async (namaMk) => {
                    rl.question("SKS : ", async (sks) => {
                        if (await MataKuliah.search(idMatul)) {
                            console.log('\nGagal Menambahkan Mata Kuliah, Mata Kuliah telah terdaftar')
                            MataKuliah.menuMk()
                        } else {
                            MataKuliah.add(idMatul, namaMk, sks)
                            console.log("Mata Kuliah telah ditambahkan")
                            MatkulChannel.menuMk()
                        }
                    })
                })
            })
        }
    }

    static async hapusMk() {
        rl.question('Masukkan Kode Mata Kuliah : ', async (idMatkul) => {
            const dosen = await MataKuliah.read()
            if (dosen) {
               console.log(`Mata Kuliah dengan kode ${idMatkul}, telah dihapus`)
               await MataKuliah.delete(idMatkul)
               MatkulChannel.menuMk()
            } else {
               console.log(`Gagal menghapus Mata Kuliah, ID Mata Kuliah tidak terdaftar`)
                MatkulChannel.menuMk()
            }
         })
      }
}