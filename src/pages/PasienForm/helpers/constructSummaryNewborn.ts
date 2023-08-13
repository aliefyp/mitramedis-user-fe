import moment from "moment";
import { PatientTypeForm } from "types/patient";

interface Props {
  namePrefix?: string;
  data?: PatientTypeForm;
}

const constructSummaryNewborn = ({ namePrefix, data }: Props) => {
  if (!data) return [];

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
      key: "Metode Pembayaran",
      value: `${data.payment_method_string} ${data.payment_method_other && `: ${data.payment_method_other}`}`,
    },
  ]
}

export default constructSummaryNewborn;
