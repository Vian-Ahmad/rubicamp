const fs = require("fs")
const datanya = JSON.parse(fs.readFileSync('todo.json', 'utf-8'))
const command = process.argv[2]
const inputId = process.argv[3]
const inputTugas = process.argv.slice(3).join(' ')
const taging = process.argv.slice(4)

if (!command || command.toLowerCase() == "help") {
    tampilkanTodo()
} else if (command == "list") {
    daftarTask()
} else if (command == "add") {
    tambahTugas(inputTugas)
} else if (command == "complete") {
    beres(inputId)
} else if (command == "uncomplete") {
    batalBeres(inputId)
} else if (command == "delete") {
    hapus(inputId)
} else if (command == "list:outstanding") {
    belumBeres(inputId)
} else if (command == "list:complete") {
    daftarBeres(inputId)
} else if (command == "tag") {
    tambahTag(taging)
} else if (`filter:${command.slice(7)}`) {
    pilahTag()
}

function tampilkanTodo() {

    console.log(`      >>> JS TODO <<<
      $ node todo.js <command>
      $ node todo.js list
      $ node todo.js task <task_id>
      $ node todo.js add <task_content>
      $ node todo.js delete <task_id>
      $ node todo.js complete <task_id>
      $ node todo.js uncomplete <task_id>
      $ node todo.js list:outstanding asc|desc
      $ node todo.js list:completed asc|desc
      $ node todo.js tag <tag_name_1> <tag_name_2> ... <tag_name_N>
      $ node todo.js filter:<tag_name>`)
}

function daftarTask() {

    if (datanya.length === 0) {
        console.log('Daftar kerjaan kosong.');
    } else {
        console.log('Daftar Pekerjaan');
        datanya.forEach((data, index) => {
            console.log(`${index + 1}. [${data.complete ? 'x' : ' '}] ${data.namaTugas}`);
        });
    }
}

function tambahTugas(tugas) {

    const dataBaru = {
        id: datanya.length + 1,
        namaTugas: tugas,
        complete: false,
        tags: []
    }

    datanya.push(dataBaru)
    fs.writeFileSync("todo.json", JSON.stringify(datanya), 'utf-8');
    console.log(`"${tugas}" telah ditambahkan`)
}

function beres(id) {
    datanya.forEach(item => {
        if (item.id == id) {
            item.complete = true
            console.log(`"${item.namaTugas}" telah selesai`)
        }
    })
    fs.writeFileSync("todo.json", JSON.stringify(datanya), 'utf-8');
}

function batalBeres(id) {
    datanya.forEach(item => {
        if (item.id == id) {
            item.complete = false
            console.log(`"${item.namaTugas}" status selesai dibatalkan`)
        }
    })
    fs.writeFileSync("todo.json", JSON.stringify(datanya), 'utf-8');
}

function hapus(id) {

    if (id > datanya.length) {
        console.log("Data hanya sampai ke- ", datanya.length);
        return;
    }
    const tugasDihapus = datanya.splice(id - 1, 1)[0]; // Hapus dan simpan tugas yang dihapus
    console.log(`"${tugasDihapus.namaTugas}" telah dihapus dari daftar`);

    // Setel ulang nomor ID setiap elemen
    datanya.forEach((item, index) => {
        item.id = index + 1;
    });

    fs.writeFileSync("todo.json", JSON.stringify(datanya), 'utf-8');
}

function belumBeres(orde8r) {
    console.log("Daftar Pekerjaan");
    const tugasBelumBeres = datanya.filter(item => !item.complete);

    if (tugasBelumBeres.length === 0) {
        console.log('Semua pekerjaan selesai atau tidak ada pekerjaan.');
    } else {
        if (order === "asc") {
            tugasBelumBeres.forEach((task, index) => {
                console.log(`${task.id}. [ ] ${task.namaTugas}`);
            });
        } else if (order === "desc") {
            tugasBelumBeres.reverse().forEach((task, index) => {
                console.log(`${task.id}. [ ] ${task.namaTugas}`);
            });
        }
    }
}

function daftarBeres(id) {
    console.log("daftar kerjaan")
    for (let i of datanya) {
        if (i.complete) {
            i.complete = "[x]";
            wadah.push(`${i.id}: ${i.complete} ${i.namaTugas}.`);
        }
    }
    if (id == "asc") console.log(wadah2.join("\n"));
    else if (id == "desc") console.log(wadah2.reverse().join("\n"));
}

function tambahTag(tagar) {

    console.log(
        `Tag ${tagar} telah ditambahkan ke dalam daftar '${datanya[datanya.findIndex((i) => i.id == inputId)].namaTugas
        }'`
    );
    datanya[inputId - 1].tags = process.argv.slice(4);
    fs.writeFileSync("todo.json", JSON.stringify(datanya), "utf-8");
}

function pilahTag() {

    console.log("Daftar Pekerjaan");
    for (let i of datanya) {
        if (i.tags.includes(command.slice(7))) {
            if (i.complete) {
                i.complete = "[x]";
                console.log(`${i.id}: ${i.complete} ${i.namaTugas}.`);
            } else if (!i.complete) {
                i.complete = "[ ]"
                console.log(`${i.id}: ${i.complete} ${i.namaTugas}.`)
            }
        }
    }
}