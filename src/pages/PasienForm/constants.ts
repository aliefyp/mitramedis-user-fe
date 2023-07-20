export const OPTIONS_HOUR = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
]

export const OPTIONS_MINUTE = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
];

export const OPTIONS_GENDER = [
  "Tidak diketahui",
  "Laki-laki",
  "Perempuan",
  "Tidak dapat ditentukan",
]

export const OPTIONS_RELIGION = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Budha",
  "Khonghucu",
  "Penghayat",
  "Lain-lain",
]

export const OPTIONS_EDUCATION = [
  "Tidak Sekolah",
  "SD",
  "SLTP/Sederajat",
  "SLTA/Sederajat",
  "D1-D3/Sederajat",
  "S1",
  "S2",
  "S3",
]

export const OPTIONS_OCCUPATION = [
  "Tidak bekerja",
  "PNS",
  "TNI/Polri",
  "BUMN",
  "Pegawai Swasta/Wiraswasta",
  "Lain-lain",
]

export const OPTIONS_MARITAL_STATUS = [
  "Belum kawin",
  "Kawin",
  "Cerai hidup",
  "Cerai mati"
]

export const OPTIONS_PAYMENT_METHOD = [
  "Mandiri",
  "BPJS",
  "Asuransi Lainnya"
]

export const FORM_ADULT_PATIENT_ATTRIBUTES = {
  patient_name: {
    label: "Nama Lengkap",
    placeholder: "Nama pasien sesuai KTP",
  },
  id_card_number: {
    label: "NIK",
    placeholder: "16 digit nomor KTP",
  },
  id_card_number_2: {
    label: "Nomor Identitas Lain (Khusus WNA)",
    placeholder: "Nomor PASPOR / KITAS"
  },
  mother_name: {
    label: "Nama Ibu Kandung",
    placeholder: "Nama ibu kandung sesuai KTP"
  },
  birth_place: {
    label: "Tempat Lahir",
    placeholder: "Nama Kota/Kabupaten"
  },
  birth_date: {
    label: "Tanggal Lahir",
    placeholder: "DD/MM/YYYY"
  },
  gender: {
    label: "Jenis Kelamin",
    placeholder: "Pilih jenis kelamin"
  },
  phone_1: {
    label: "No. HP",
    placeholder: "08123xxxxxxx"
  },
  phone_2: {
    label: "No. Telepon Rumah",
    placeholder: "08123xxxxxxx"
  },
  education: {
    label: "Pendidikan Terakhir",
    placeholder: "Pilih pendidikan terakhir"
  },
  occupation: {
    label: "Pekerjaan",
    placeholder: "Pekerjaan saat ini",
  },
  marital_status: {
    label: "Status pernikahan",
    placeholder: "Status pernikahan"
  },
  payment_method: {
    label: "Metode Pembayaran",
    placeholder: "Pilih metode pembayaran yang digunakan"
  },
  payment_method_other: {
    label: "Asuransi Lainnya",
    placeholder: "Tulis jenis asuransi"
  },
  address_1: {
    label: "Alamat Lengkap",
    placeholder: "Alamat lengkap sesuai kartu identitas",
  },
  address_1_province: {
    label: "Provinsi",
    placeholder: "Pilih provinsi",
  },
  address_1_city: {
    label: "Kotamadya / Kabupaten",
    placeholder: "Pilih kota atau kabupaten",
  },
  address_1_district: {
    label: "Kecamatan",
    placeholder: "Pilih kecamatan",
  },
  address_1_zip: {
    label: "Kode Pos",
    placeholder: "00xxx",
  },
  address_1_subdistrict: {
    label: "Kelurahan / Desa",
    placeholder: "Pilih kelurahan atau desa",
  },
  address_1_rt: {
    label: "Rukun Tetangga / RT",
    placeholder: "00x",
  },
  address_1_rw: {
    label: "Rukun Warga / RW",
    placeholder: "00x",
  },
  address_2: {
    label: "Alamat Domisili",
    placeholder: "Alamat lengkap sesuai kartu identitas",
  },
  address_2_province: {
    label: "Provinsi",
    placeholder: "Pilih provinsi",
  },
  address_2_city: {
    label: "Kotamadya / Kabupaten",
    placeholder: "Pilih kota atau kabupaten",
  },
  address_2_district: {
    label: "Kecamatan",
    placeholder: "Pilih kecamatan",
  },
  address_2_zip: {
    label: "Kode Pos",
    placeholder: "00xxx",
  },
  address_2_subdistrict: {
    label: "Kelurahan / Desa",
    placeholder: "Pilih kelurahan atau desa",
  },
  address_2_rt: {
    label: "Rukun Tetangga / RT",
    placeholder: "00x",
  },
  address_2_rw: {
    label: "Rukun Warga / RW",
    placeholder: "00x",
  },
}

export const FORM_NEWBORN_PATIENT_ATTRIBUTES = {
  patient_name: {
    label: "Nama Bayi",
    placeholder: "Nama ibu bayi"
  },
  id_card_number: {
    label: "NIK Ibu Kandung",
    placeholder: "16 digit nomor KTP",
  },
  gender: {
    label: "Jenis Kelamin",
    placeholder: "Pilih jenis kelamin"
  },
  birth_date: {
    label: "Tanggal Lahir",
    placeholder: "DD/MM/YYYY"
  },
  birth_hour: {
    label: "Jam",
    placeholder: "00"
  },
  birth_minute: {
    label: "Menit",
    placeholder: "00"
  },
  payment_method: {
    label: "Metode Pembayaran",
    placeholder: "Pilih metode pembayaran yang digunakan"
  },
  payment_method_other: {
    label: "Asuransi Lainnya",
    placeholder: "Tulis jenis asuransi"
  },
}