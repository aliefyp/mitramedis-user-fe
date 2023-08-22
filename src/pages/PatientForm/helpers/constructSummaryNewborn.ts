import moment from "moment";
import { PatientTypeForm } from "types/patient";

interface Props {
  namePrefix?: string;
  data?: PatientTypeForm;
}

const constructSummaryNewborn = ({ namePrefix, data }: Props) => {
  if (!data) return [];

  const displayedAddress = `${data.address} ${data.rt}/${data.rw} ${data.village_string}, ${data.district_string}, ${data.city_string}, ${data.province_string} ${data.zip_code}`;
  const displayedDomicileAddress = !data.is_same_domicile ? '-' : `${data.domicile_address} ${data.domicile_rt}/${data.domicile_rw} ${data.domicile_village_string}, ${data.domicile_district_string}, ${data.domicile_city_string}, ${data.domicile_province_string} ${data.domicile_zip_code}`

  return [
    {
      key: "Nama",
      value: `${namePrefix} ${data.patient_name}`,
    },
    {
      key: "NIK Ibu Kandung",
      value: data.id_card_number,
    },
    {
      key: "Jenis Kelamin",
      value: data.gender_string,
    },
    {
      key: "Tanggal Lahir",
      value: moment(data.birthdate).format("dddd, DD MMMM YYYY"),
    },
    {
      key: "Jam Lahir",
      value: data.birth_time,
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
    {
      key: "Metode Pembayaran",
      value: `${data.payment_method_string} ${data.payment_method_other && `: ${data.payment_method_other}`}`,
    },
  ]
}

export default constructSummaryNewborn;
