import { useForm } from "react-hook-form";
import { useState } from "react";
import Typography from "components/Typography";
import TextArea from "components/FormInput/TextArea";
import Input from "components/FormInput/Input";
import CheckBox from "components/FormInput/CheckBox";
import FormSection from "components/FormSection";

import CardTindakan from "./CardTindakan";
import CardBMHP from "./CardBMHP";

interface FormTindakanType {
  kie: string;
  consent: boolean;
  officer_name: string;
  created_date: string;
  created_time: string;
  action_name: string;
  action_count: string;
  bmhp_name: string;
  bmhp_count: string;
}

const FormTindakan = () => {
  const [actions, setActions] = useState([]);
  const [bmhp, setBmhp] = useState([]);
  const { register, handleSubmit } = useForm<FormTindakanType>();

  const onSubmit = (val: FormTindakanType) => {
    console.log(val);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="KIE (Komunikasi, Informasi, dan Edukasi)">
        <TextArea
          label="Komunikasi, Informasi, dan Edukasi"
          placeholder="Tuliskan KIE yang disarankan pada pasien"
          {...register("kie")}
        />
      </FormSection>

      <FormSection title="Tidakan">
        <div className="grid grid-cols-2 gap-6">
          <Input
            readOnly
            disabled
            label="Nama Petugas"
            type="text"
            className="col-span-2"
            value="Dr. Risky Dwi Setiyawan"
            {...register("officer_name")}
          />

          <Input
            label="Tanggal Pelaksanaan Tindakan"
            type="date"
            className="col-span-2 md:col-span-1"
            placeholder="DD/MM/YYYY"
            {...register("created_date")}
          />

          <Input
            suffix="WIB"
            label="Waktu Pelaksanaan Tindakan"
            type="time"
            className="col-span-2 md:col-span-1"
            placeholder="HH:mm"
            {...register("created_time")}
          />
        </div>
        <div className="mt-8 space-y-4">
          <CardTindakan
            items={actions}
            register={register}
            onAdd={() => setActions([...actions, actions.length])}
            onDelete={(index) =>
              setActions(actions.filter((_, i) => i !== index))
            }
          />
          <CardBMHP
            items={bmhp}
            register={register}
            onAdd={() => setBmhp([...bmhp, bmhp.length])}
            onDelete={(index) => setBmhp(bmhp.filter((_, i) => i !== index))}
          />
        </div>
      </FormSection>
      <FormSection>
        <div className="col-span-2 flex items-start gap-6">
          <CheckBox {...register("consent")}>
            <Typography>
              Pasien telah diberikan penjelasan dan menyetujui Persetujuan
              Tindakan (<i>Informed Consent</i>).{" "}
              <Typography link as="span" className="cursor-pointer ">
                Klik disini untuk cetak Informed Consent.
              </Typography>
            </Typography>
          </CheckBox>
        </div>
      </FormSection>
    </form>
  );
};

export default FormTindakan;
