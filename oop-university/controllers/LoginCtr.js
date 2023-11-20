import { rl } from "../Penghubung.js"
import Login from "../models/LogIn.js"
import { mainMenu } from "../univApp.js"
import { masuk } from "../views/LoginView.js"

export default class MasukAkun {
    static in() {
        MasukAkun.izin()

    }

    static izin() {
        rl.question('Username :', async (userName) => {
            Login.readUserName(userName, function (data) {
                if (!data) {
                    console.log('Username tidak terdaftar, silahkan coba lagi')
                    MasukAkun.izin()
                } else {
                    rl.question('Password :', async (nomorPin) => {
                        Login.readNomorPin(nomorPin, function (pwd) {
                            if (!pwd) {
                                console.log('Password salah')
                                MasukAkun.izin()
                            } else {
                                masuk(userName)
                                mainMenu()
                            }

                        })

                    })
                }
            })
        })

    }
}