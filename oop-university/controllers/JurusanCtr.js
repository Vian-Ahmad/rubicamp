import { rl } from "../Penghubung.js";
import Jurusan from "../models/Jurusan.js";
import { mainMenu } from "../univApp.js";
import { searchJurusan, submenuJurusan, tampilkanJurusan } from "../views/JurusanView.js";


export default class JurusanChannel {

    static menuJurusan() {
        submenuJurusan()
        rl.question(`Masukkan salah satu nomor dari opsi diatas : `, (index) => {
            switch (index) {
                case "1":
                    JurusanChannel.daftarJurusan()
                    break;
                case "2":
                    JurusanChannel.cariJurusan()
                    break;
                case "3":
                    JurusanChannel.tambahJurusan()
                    break;
                case "4":
                    JurusanChannel.hapusJurusan()
                    break;
                case "5":
                    mainMenu()
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan cobalagi')
                    JurusanChannel.menuJurusan()
                    break;
            }
        })
    }


    static async daftarJurusan() {
        const listJurusan = await Jurusan.read()
        if (listJurusan) {
            tampilkanJurusan(listJurusan)
            JurusanChannel.menuJurusan()
        } else {
            console.log(`Terjadi kesalahan dalam proses pemanggilan data, silahkan coba lagi`)
            JurusanChannel.menuJurusan()
        }
    }

    static cariJurusan() {
        rl.question("Masukan Kode Jurusan :", async (kode) => {
            const dataJurusan = await Jurusan.search(kode)
            if (dataJurusan) {
                searchJurusan(dataJurusan)
                JurusanChannel.menuJurusan()
            } else {
                console.log(`Jurusan dengan Kode ${kode}, tidak terdaftar`)
                JurusanChannel.menuJurusan()
            }
        })
    }

    static async tambahJurusan() {
        console.log('Lengkapi data dibawah ini :\n')
        const dataJrs = await Jurusan.read()
        if (dataJrs) {
            tampilkanJurusan(dataJrs)
            rl.question("Kode Jurusan :", async (idJurusan) => {
                rl.question("Nama Jurusan :", async (namaJurusan) => {
                    if (await Jurusan.search(idJurusan)) {
                        console.log("\nGagal Menambahkan Jurusan, Jurusan Telah Terdaftar" )
                        JurusanChannel.daftarJurusan()
                    } else {
                        Jurusan.add(idJurusan, namaJurusan)
                        console.log("Jurusan Telah Ditambahkan")
                        JurusanChannel.daftarJurusan()
                    }
                })
            })
        }
    }

    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan : ', async (idJurusan) => {
           const dosen = await Jurusan.read()
           if (dosen) {
              console.log(`Data Jurusan ${idJurusan}, telah dihapus`)
              await Jurusan.delete(idJurusan)
              JurusanChannel.menuJurusan()
           } else {
              console.log(`Gagal menghapus Jurusan, Jurusan tidak terdaftar`)
              JurusanChannel.menuJurusan()
           }
        })
     }
}
