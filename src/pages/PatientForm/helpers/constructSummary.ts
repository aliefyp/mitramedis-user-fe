import moment from "moment";
import { PatientTypeForm } from "types/patient";
interface Props {
  isBaby: boolean;
  data?: PatientTypeForm;
}

const constructSummary = ({ isBaby, data }: Props) => {
  if (!data) return [];

  const displayedAddress = `${data.address} ${data.rt}/${data.rw} ${data.village_string}, ${data.district_string}, ${data.city_string}, ${data.province_string} ${data.zip_code}`;
  const displayedDomicileAddress = data.is_same_domicile ? '-' : `${data.domicile_address} ${data.domicile_rt}/${data.domicile_rw} ${data.domicile_village_string}, ${data.domicile_district_string}, ${data.domicile_city_string}, ${data.domicile_province_string} ${data.domicile_zip_code}`
  
  return [
    {
      key: "Nama",
      value: `${data.is_baby ? 'Bayi Ny.' : ''} ${data.patient_name}`,
    },
    {
      key: "NIK",
      value: data.id_card_number,
    },
    {
      key: "No. Identitas Lain",
      value: data.other_id_card_number || '-',
    },
    {
      key: "Nama Ibu Kandung",
      value: data.mother_name || '-',
    },
    {
      key: isBaby ? "Tanggal/Jam Lahir" : "Tempat/Tanggal Lahir",
      value: isBaby
        ? `${moment(data.birthdate).format("DD MMMM YYYY")}, ${data.birth_time}`
        : `${data.birthplace}, ${moment(data.birthdate).format("DD MMMM YYYY")}`,
    },
    {
      key: "Jenis Kelamin",
      value: data.gender_string,
    },
    {
      key: "Alamat",
      value: displayedAddress
    },
    {
      key: "Alamat Domisili",
      value: displayedDomicileAddress
    },
    {
      key: "No. HP",
      value: data.phone_number,
    },
    {
      key: "No. Telepon Rumah",
      value: data.other_phone_number || '-',
    },
    ...(!isBaby ? ([{
        key: "Pendidikan Terakhir",
        value: data.education_string || '-'
      },
      {
        key: "Pekerjaan",
        value: data.job || '-'
      },
      {
        key: "Status Pernikahan",
        value: data.marital_string || '-'
      },
    ]): []),
    {
      key: "Metode Pembayaran",
      value: `${data.payment_method_string} ${data.payment_method_other && `: ${data.payment_method_other}`}`,
    },
  ]
}

export default constructSummary;
