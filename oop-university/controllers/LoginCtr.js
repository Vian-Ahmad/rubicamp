import { rl } from "../Penghubung.js"
import Login from "../models/LogIn.js"
import { mainMenu } from "../univApp.js"
import { masuk } from "../views/LoginView.js"

export default class MasukAkun {
    static in() {
        MasukAkun.izin()

    }

    static izin() {
        rl.question('Username :', async (NAMA) => {
            Login.readUserName(NAMA, function (data) {
                if(!data) {
                    console.log('Username tidak terdaftar, silahkan coba lagi')
                    MasukAkun.izin()
                } else {
                    rl.question('Password :', async (pass) => {
                        if (!pass) {
                            console.log('Password salah')
                            MasukAkun.izin()
                        } else {
                            masuk()
                            mainMenu()
                        }
                    })
                }
            })
        })

    }
}