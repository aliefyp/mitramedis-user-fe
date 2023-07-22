import { useForm } from "react-hook-form";
import { useState } from "react";
import Typography from "components/Typography";
import TextArea from "components/FormInput/TextArea";
import Input from "components/FormInput/Input";
import CheckBox from "components/FormInput/CheckBox";

import CardAction from "./CardAction";
import CardBMHP from "./CardBMHP";
import Toggle from "components/Toggle";
import Label from "components/FormInput/Label";
import Card from "components/Card";

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
  with_action: boolean;
}

const FormTindakan = () => {
  const [actions, setActions] = useState([]);
  const [bmhp, setBmhp] = useState([]);
  const [showKIE, setShowKIE] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const { register, handleSubmit } = useForm<FormTindakanType>();

  const onSubmit = (val: FormTindakanType) => {
    console.log(val);
  };

  return (
    <form className="grid gap-6 py-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Toggle
          value={showKIE}
          onSwitch={setShowKIE}
          {...register("with_action")}
        >
          <Label>Ada KIE (Komunikasi, Informasi, Edukasi)</Label>
        </Toggle>
        {showKIE && (
          <TextArea
            placeholder="Tuliskan KIE yang disarankan pada pasien"
            {...register("kie")}
          />
        )}
      </div>
      <div className="grid gap-4">
        <Toggle
          value={showAction}
          onSwitch={setShowAction}
          {...register("with_action")}
        >
          <Label>Ada Tindakan</Label>
        </Toggle>
        {showAction && (
          <Card className="grid grid-cols-4 items-end gap-6 rounded-lg border p-4">
            <Input
              label="Tanggal"
              type="date"
              className="col-span-2 md:col-span-1"
              placeholder="DD/MM/YYYY"
              {...register("created_date")}
            />

            <Input
              // suffix="WIB"
              label="Waktu"
              type="time"
              className="col-span-2 md:col-span-1"
              placeholder="HH:mm"
              {...register("created_time")}
            />
            <div className="col-span-4 md:col-span-2">
              <Label>Petugas</Label>
              <Typography className="text-md">
                Dr. Risky Dwi Setiyawan
              </Typography>
            </div>

            <div className="col-span-4">
              <CardAction
                items={actions}
                register={register}
                onAdd={() => setActions([...actions, actions.length])}
                onDelete={(index) =>
                  setActions(actions.filter((_, i) => i !== index))
                }
              />
            </div>
            <div className="col-span-4">
              <CardBMHP
                items={bmhp}
                register={register}
                onAdd={() => setBmhp([...bmhp, bmhp.length])}
                onDelete={(index) =>
                  setBmhp(bmhp.filter((_, i) => i !== index))
                }
              />
            </div>
            <div className="col-span-4 flex items-start gap-6">
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
          </Card>
        )}
      </div>
    </form>
  );
};

export default FormTindakan;
