import { rl } from "../Penghubung.js";
import Jurusan from "../models/Jurusan.js";
import Mahasiswa from "../models/Mahasiswa.js";
import { mainMenu } from "../univApp.js";
import { tampilkanJurusan } from "../views/JurusanView.js";
import { searchMahasiswa, submenuMahasiswa, tampilkanMahasiswa } from "../views/MahasiswaView.js";

export default class MahasiswaChannel {
    static menuMahasiswa() {
        submenuMahasiswa()
        rl.question(`Masukkan salah satu nomor dari opsi diatas : `, (index) => {
            switch (index) {
                case "1":
                    MahasiswaChannel.daftarMahasiswa()
                    break;
                case "2":
                    MahasiswaChannel.cariMahasiswa()
                    break;
                case "3":
                    MahasiswaChannel.tambahMahasiswa()
                    break;
                case "4":
                    MahasiswaChannel.hapusMahasiswa()
                    break;
                case "5":
                    mainMenu()
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan cobalagi')
                    MahasiswaChannel.menuMahasiswa()
                    break;

            }
        })
    }

    static async daftarMahasiswa() {
        const listMahasiswa = await Mahasiswa.read()
        if (listMahasiswa) {
            tampilkanMahasiswa(listMahasiswa)
            MahasiswaChannel.menuMahasiswa()
        } else {
            console.log(`Terjadi kesalahan dalam proses pemanggilan data, silahkan coba lagi`)
            MahasiswaChannel.menuMahasiswa()
        }
    }

    static cariMahasiswa() {
        rl.question("Masukan NIM Mahasiswa :", async (kode) => {
            const dataMahasiswa = await Mahasiswa.search(kode)
            if (dataMahasiswa) {
                searchMahasiswa(dataMahasiswa)
                MahasiswaChannel.menuMahasiswa()
            } else {
                console.log(`Mahasiswa Dengan NIM ${kode}, Tidak Terdaftar`)
                MahasiswaChannel.menuMahasiswa()
            }
        })
    }

    static async tambahMahasiswa() {
        console.log('Lengkapi data dibawah ini :\n')
        Mahasiswa.read().then((data) => {
            tampilkanMahasiswa(data)
            rl.question("NIM :", (nim) => {
                rl.question("Nama :", (namaMahasiswa) => {
                    rl.question("Tanggal lahir 'TH/BL/TG' :", (tanggalLahir) => {
                        rl.question("Alamat :", (alamat) => {
                            Jurusan.read().then((data) => {
                                tampilkanJurusan(data)
                                rl.question("Kode Jurusan :", async (idJurusan) => {
                                    Mahasiswa.search(nim).then((data) => {
                                        console.log(`Mahasiswa dengan NIM ${data.nim} sudah terdaftar. Silahkan masukkan data dengan benar`)
                                        MahasiswaChannel.menuMahasiswa()
                                    }).catch(() => {
                                        Mahasiswa.add(nim, namaMahasiswa, tanggalLahir, alamat, idJurusan)
                                        console.log('Mahasiswa telah ditambahkan')
                                        Mahasiswa.read().then((data) => {
                                            tampilkanMahasiswa(data)
                                            MahasiswaChannel.menuMahasiswa()
                                        }).catch(() => {
                                            console.log('Gagal Menambahkan data Mahasiswa')
                                            MahasiswaChannel.menuMahasiswa()
                                        })
                                    })
                                })
                            }).catch(() => {
                                console.log('Terjadi Kesalahan Pada Saat Menampilkan Data. Silahkan Coba Lagi')
                                MahasiswaChannel.menuMahasiswa()
                            })
                        })
                    })
                })
            })
        }).catch(() => {
            console.log('Terjadi Kesalahan Pada Saat Menampilkan data Mahasiswa. Silahkan Coba Lagi')
            MahasiswaChannel.menuMahasiswa()
        })
    }

    static hapusMahasiswa() {
        rl.question("Masukkan NIM Mahasiswa : ", async (nim) => {
            if (await Mahasiswa.read(nim)) {
                Mahasiswa.delete(nim)
                console.log(`Data Mahasiswa ${nim}, telah dihapus`)
                MahasiswaChannel.menuMahasiswa()
            } else {
                console.log(`Mahasiswa gagal dihapus, Silahkan Coba Lagi`)
                MahasiswaChannel.menuMahasiswa()
            }
        })
    }
}