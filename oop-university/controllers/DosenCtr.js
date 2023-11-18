import Dosen from "../models/Dosen.js"
import { rl } from "../Penghubung.js"
import { mainMenu } from "../univApp.js"
import { searchDosen, submenu, tampilkanDosen } from "../views/DosenView.js"


export default class DosenChannel {

   static menuDosen() {
      submenu()
      rl.question(`Masukkan salah satu nomor dari opsi diatas : `, (index) => {
         switch (index) {
            case "1":
               DosenChannel.daftarDosen()
               break;
            case "2":
               DosenChannel.cariDosen()
               break;
            case "3":
               DosenChannel.tambahDosen()
               break;
            case "4":
               DosenChannel.hapusDosen()
               break;
            case "5":
               mainMenu()
               break;
            default:
               console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi')
               DosenChannel.menuDosen()
               break;
         }
      })
   }

   static async daftarDosen() {
      const dosen = await Dosen.read()
      if (dosen) {
         tampilkanDosen(dosen)
         DosenChannel.menuDosen()
      } else {
         console.log(`Terjadi kesalahan dama proses pemanggilan data, silahkan coba lagi`)
         DosenChannel.menuDosen()
      }
   }

   static cariDosen() {
      rl.question("Masukan NIP :", async (kode) => {
         const dataDosen = await Dosen.search(kode)
         if (dataDosen) {
            searchDosen(dataDosen)
            DosenChannel.menuDosen()
         } else {
            console.log(`Dosen dengan NIP ${kode}, tidak terdaftar`)
            DosenChannel.menuDosen()
         }
      })
   }

   static async tambahDosen() {
      console.log('Lengkapi data dibawah ini :\n')
      const dosen = await Dosen.read()
      if (dosen) {
         tampilkanDosen(dosen)
         rl.question('Masukkan NIP Dosen : ', async (nip) => {
            rl.question('Nama Dosen : ', async (nama) => {
               if (await Dosen.search(nip)) {
                  console.log('\nGagal menambahkan Dosen, Dosen telah terdaftar')
                  DosenChannel.menuDosen()
               } else {
                  Dosen.add(nip, nama)
                  console.log(`Dosen telah ditambahkan`)
                  DosenChannel.menuDosen()
               }
            })
         })
      }
   }

   static hapusDosen() {
      rl.question('Masukkan NIP Dosen : ', async (nip) => {
         const dosen = await Dosen.read()
         if (dosen) {
            console.log(`Data Dosen ${nip}, telah dihapus`)
            await Dosen.delete(nip)
            DosenChannel.menuDosen()
         } else {
            console.log(`Gagal menghapus Dosen, NIP tidak terdaftar`)
            DosenChannel.menuDosen()
         }
      })
   }
}


