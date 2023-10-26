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
('MT030', 'Matematika', '3');

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
('A1040', 'Tara Bath', 'Bojong Kenyot', 'MK0200');

create table dosen (
    nip VARCHAR(5)  primary key not null,
    nama VARCHAR(100) not null
);

insert into dosen values
('ND001', 'Sutopo'),
('ND002', 'Ita'),
('ND003', 'Pringgodani');

create table kontrak(
    id integer  primary key autoincrement,
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
('A1020', 'BE010', 'ND003','A'),
('A1030', 'KP401', 'ND002','B'),
('A1040', 'BE010', 'ND003','B');

