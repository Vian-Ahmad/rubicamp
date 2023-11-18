import { rl } from "../Penghubung.js";
import Dosen from "../models/Dosen.js";
import Kontrak from "../models/Kontrak.js";
import Mahasiswa from "../models/Mahasiswa.js";
import MataKuliah from "../models/MataKuliah.js";
import { line, mainMenu } from "../univApp.js";
import { tampilkanDosen } from "../views/DosenView.js";
import { listKontrak, showMataKlh, submenuKontrak, tampilkanKontrak, tbNilaiMhs } from "../views/KontrakView.js";
import { tampilkanMahasiswa } from "../views/MahasiswaView.js";


export default class KontrakChannel {
    static menuKontrak() {
        submenuKontrak()
        rl.question(`Masukkan salah satu nomor dari opsi diatas : `, (index) => {
            switch (index) {
                case "1":
                    KontrakChannel.daftarKontrak()
                    break;
                case "2":
                    KontrakChannel.cariKontrak()
                    break;
                case "3":
                    KontrakChannel.tambahKontrak()
                    break;
                case "4":
                    KontrakChannel.hapusKontrak()
                    break;
                case "5":
                    KontrakChannel.updateKontrak()
                    break;
                case "6":
                    mainMenu()
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi')
                    KontrakChannel.menuKontrak()
                    break;
            }
        })
    }

    static async daftarKontrak() {
        if (await Kontrak.read()) {
            tampilkanKontrak(await Kontrak.read())
            KontrakChannel.menuKontrak()
        } else {
            console.log('Terjadi kesalahan dalam proses pemanggilan data, silahkan coba lagi')
            KontrakChannel.menuKontrak()
        }

    }

    static async cariKontrak() {
        tampilkanMahasiswa(await Mahasiswa.read())
        rl.question("Masukan NIM Mahasiswa :", async (kode) => {
            const kontrak = await Kontrak.Search(kode)
            if (kontrak) {
                console.log(`Daftar Kontrak Mahasiswa Dengan NIM ${kode} adalah : `)
                tbNilaiMhs(kontrak)
                KontrakChannel.menuKontrak()
            } else {
                console.log(`Kontrak dengan NIM ${kode}, tidak terdaftar`)
                KontrakChannel.menuKontrak()
            }
        })
    }

    static async tambahKontrak() {
        console.log('Lengkapi data dibawah ini :')
        if (await Mahasiswa.read()) {
            tampilkanMahasiswa(await Mahasiswa.read())
            rl.question('Masukkan NIM Mahasiswa :', async (nim) => {
                showMataKlh(await MataKuliah.read(nim))
                rl.question('Masukkan Kode Mata Kuliah :', async (idMatkul) => {
                    tampilkanDosen(await Dosen.read())
                    rl.question('Masukkan NIP Dosen :', async (nip) => {
                        Kontrak.add(nim, idMatkul, nip)
                        console.log('Kontrak telah ditambahkan')
                        tampilkanKontrak(await Kontrak.read())
                        KontrakChannel.menuKontrak()
                    })
                })
            })
        } else {
            console.log('Terjadi Kesalahan pada saat menampilkan data, silahkan coba lagi')
            KontrakChannel.menuKontrak()
        }
    }

    static hapusKontrak() {
        rl.question('Masukkan ID kontrak :', async (id) => {
            if (await Kontrak.read(id)) {
                Kontrak.delete(id)
                console.log(`Data dengan ID ${id}, telah dihapus`)
                KontrakChannel.menuKontrak()
            } else {
                console.log(`Kontrak gagal dihapus, Silahkan Coba Lagi`)
                KontrakChannel.menuKontrak()
            }
        })
    }

    static async updateKontrak() {
        if (await Kontrak.read()) {
            tampilkanKontrak(await Kontrak.read())
            rl.question('Masukkan NIM Mahasiswa :', async (nim) => {
                line()
                if (await Kontrak.Search(nim)) {
                    console.log(`Detail Mahasiswa dengan NIM ${nim} :`)
                    listKontrak(await Kontrak.Search(nim))
                    line()
                    rl.question('Masukkan ID yang ingin dirubah nilainnya :', async (id) => {
                        line()
                        if (await Kontrak.read()) {
                            rl.question('Tulis Nilai Yang Baru :', async (nilai) => {
                                line()
                                await Kontrak.update(nilai, id, nim)
                                console.log('Nilai telah di update')
                                tampilkanKontrak(await Kontrak.read())
                                KontrakChannel.menuKontrak()
                            })
                        } else {
                            console.log('ID dan NIM yang anda masukkan salah silahkan coba lagi')
                            KontrakChannel.menuKontrak()
                        }
                    })
                } else {
                    console.log(`Kontrak dengan NIM ${nim} tidak ada, silahkan coba lagi`)
                    KontrakChannel.menuKontrak()
                }
            })
        } else {
            console.log('Terjadi kesalahaan pada penampilan data, silahkan coba lagi')
            KontrakChannel.menuKontrak()
        }
    }


}


