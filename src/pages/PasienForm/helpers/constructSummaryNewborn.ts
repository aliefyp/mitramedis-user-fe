import moment from "moment";
import { PatientType } from "types/patient";
import { OPTIONS_GENDER, OPTIONS_PAYMENT_METHOD } from "../constants";

interface Props {
  namePrefix?: string;
  data?: PatientType;
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
      value: OPTIONS_GENDER.find((i) => i.key === Number(data.gender)).label,
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
      value: `${
        OPTIONS_PAYMENT_METHOD.find((i) => i.key === Number(data.payment_method))
          .label
      } ${data.payment_method_other && `: ${data.payment_method_other}`}`,
    },
  ]
}

export default constructSummaryNewborn;
