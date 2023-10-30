create table jurusan(
    id_jurusan VARCHAR(10) primary key not null,
    nama_jurusan VARCHAR (100) not null
);
insert into jurusan values
('AK0100', 'Akuntansi'),
('MK0200', 'Manajemen Keuangan'),
('MO0300', 'Manajemen Operasional'),
('KP0400', 'Keuangan Perbankan');

create table matakuliah(
    id_matkul VARCHAR(5) primary key not null,
    nama VARCHAR(100) not null,
    sks character(1) not null
);
insert into matakuliah values
('AK101', 'Akuntansi Dasar', '3'),
('MK201', 'Manakemen Keuangan Dasar', '3'),
('MO301', 'Manajemen Operasional Dasar', '3'),
('KP401', 'Keuangan Perbankan Dasar', '3'),
('BE010', 'Bahasa Inggris', '2'),
('KI020', 'Kewarganegaraan', '2'),
('MT030', 'Matematika', '3'),
-- tambah data matakuliah "data mining" menggunakan => insert into matakuliah values (id_matkul, nama, sks)
('MO303', 'Data Mining', '3');

create table mahasiswa(
    nim VARCHAR(5) primary key not null,
    nama VARCHAR(100) not null,
    alamat text,
    id_jurusan VARCHAR(10) not null,
    foreign key(id_jurusan) references jurusan(id_jurusan)
);

insert into mahasiswa values
('A1010', 'Takur Singh', 'Wakanda', 'MK0200'),
('A1020', 'Subekti', 'Jagakarsa', 'MO0300'),
('A1030', 'Embun Mewangi', 'Cikole', 'KP0400'),
('A1040', 'Tara Bath', 'Bojong Kenyot', 'MK0200'),
-- tambah data matakuliah "data mining" menggunakan => insert into mahasiswa values (nim, nama, alamat, id_jurusan)
('A2010', 'Nasikin', 'Jember', 'MO0300');



create table dosen (
    nip VARCHAR(5)  primary key not null,
    nama VARCHAR(100) not null
);

insert into dosen values
('ND001', 'Sutopo'),
('ND002', 'Ita'),
('ND003', 'Pringgodani');

create table kontrak(
    id integer primary key autoincrement,
    nim VARCHAR(5) not null,
    id_matkul VARCHAR(5) not null,
    nip VARCHAR(5) not null,
    nilai character(1) not null,
    foreign key(nim) references mahasiswa(nim),
    foreign key(id_matkul) references matakuliah(id_matkul),
    foreign key(nip) references dosen(nip)
);

insert into kontrak(nim, id_matkul, nip, nilai) values
('A1010', 'MK201', 'ND001','C'),
('A1020', 'BE010', 'ND003','D'),
('A1030', 'KP401', 'ND002','B'),
('A1040', 'BE010', 'ND003','B');
-- update kontrak ditambahkan
('A2010', 'MO303', 'ND003','A'),
('A1010', 'BE010', 'ND003','C'),
('A1030', 'MO303', 'ND003','C'),
('A1020', 'MT030', 'ND001','D'),
('A2010', 'MT030', 'ND001','C'),
('A1040', 'MO303', 'ND003','B'),
('A1020', 'KI010', 'ND002','D'),
('A2010', 'BE010', 'ND003','C');


-- soal 1 => cara menampilkan tabel seluruh mahasiswa beserta nama jurusannya menggunakan cara, select * from mahasiswa join jurusan using(id_jurusan);


-- soal 2 => cara menampilkan mahasiswa yang dibawah umur 20 tahun 
-- -- pertama tama tambahkan terlebih dahulu kolom umur pada tabel mahasiswa
-- -- alter table mahasiswa add column tanggal_lahir DATE;
-- -- kemudan seleksi data dengan menggunakan :

    select *, date('now') - date(tanggal_lahir) as umur from mahasiswa where umur < 20;

    alter table mahasiswa add column tanggal_lahir date;

update mahasiswa set tanggal_lahir='1985-11-10' where nim='A1010',
update mahasiswa set tanggal_lahir='2003-02-28' where nim='A1020',
update mahasiswa set tanggal_lahir='2003-02-11' where nim='A1030',
update mahasiswa set tanggal_lahir='2003-08-17' where nim='A1040',
update mahasiswa set tanggal_lahir='1999-10-27' where nim='A2010',


-- soal no 3 => menampilkan mahasiswa yang memiliki nilai 'B' keatas
-- -- update data table kontrak terlebih dahulu
-- -- kemudian 
    select nim,nama,id_jurusan,id_matkul,nilai from mahasiswa join kontrak using(nim) where nilai <='B';

-- soal no 4 => menampilkan mahasiswa yang memiliki lebih dari 10 sks
    select mahasiswa.nim, mahasiswa.nama, sum(matakuliah.sks) as total_sks from mahasiswa
    join kontrak on kontrak.nim = mahasiswa.nim
    join matakuliah on kontrak.id_matkul = matakuliah.id_matkul
    group by mahasiswa.nim, mahasiswa.nama
    having total_sks < 10;

-- soal no 5 => menampilkan mahasiswa yang mengambil mata kuliah 'data mining'

    select distinct kontrak.nim, mahasiswa.nama, matakuliah.nama as matakuliah
    from kontrak inner join mahasiswa on kontrak.nim = mahasiswa.nim
    inner join matakuliah on kontrak.id_matkul = matakuliah.id_matkul
    where matakuliah.nama like 'Data Mining'; 

-- soal no 6 => menampilkan jumlah mahasiswa pada setiap dosen

    select *, (select count(distinct nim) from kontrak where kontrak.nip=dosen.nip) as jumlahmahasiswa from dosen;

-- soal no 7 => urutkan mahasiswa berdasarkan umur

    select nim, nama from mahasiswa where (strftime('%Y', 'now')) - (strftime('%Y', tanggal_lahir)) 