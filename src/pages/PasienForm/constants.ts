export const NEWBORN_PREFIX = 'Bayi Ny.';
export const PAYMENT_INSURANCE = 3;

export const OPTIONS_GENDER = [
  { key: 1, label: "Tidak diketahui" },
  { key: 2, label: "Laki-laki" },
  { key: 3, label: "Perempuan" },
  { key: 4, label: "Tidak dapat ditentukan" },
]

export const OPTIONS_RELIGION = [
  { key: 1, label: "Islam" },
  { key: 2, label: "Kristen" },
  { key: 3, label: "Katolik" },
  { key: 4, label: "Hindu" },
  { key: 5, label: "Budha" },
  { key: 6, label: "Khonghucu" },
  { key: 7, label: "Penghayat" },
  { key: 8, label: "Lain-lain" },
]

export const OPTIONS_EDUCATION = [
  { key: 1, label: "Tidak Sekolah" },
  { key: 2, label: "SD" },
  { key: 3, label: "SLTP/Sederajat" },
  { key: 4, label: "SLTA/Sederajat" },
  { key: 5, label: "D1-D3/Sederajat" },
  { key: 6, label: "S1" },
  { key: 7, label: "S2" },
  { key: 8, label: "S3" },
]

export const OPTIONS_OCCUPATION = [
  { key: 1, label: "Tidak bekerja" },
  { key: 2, label: "PNS" },
  { key: 3, label: "TNI/Polri" },
  { key: 4, label: "BUMN" },
  { key: 5, label: "Pegawai Swasta/Wiraswasta" },
  { key: 6, label: "Lain-lain" },
]

export const OPTIONS_MARITAL_STATUS = [
  { key: 1, label: "Belum kawin" },
  { key: 2, label: "Kawin" },
  { key: 3, label: "Cerai hidup" },
  { key: 4, label: "Cerai mati" },
]

export const OPTIONS_PAYMENT_METHOD = [
  { key: 1, label: "Mandiri" },
  { key: 2, label: "BPJS" },
  { key: 3, label: "Asuransi Lainnya" },
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
  address_1_village: {
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
  address_2_village: {
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