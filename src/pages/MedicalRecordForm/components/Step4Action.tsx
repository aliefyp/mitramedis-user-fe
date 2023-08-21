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
import { FormActionType } from "../interface";

const Step4Action = ({ show, defaultValues, navigation, onSubmit }) => {
  const [actions, setActions] = useState([]);
  const [bmhp, setBmhp] = useState([]);
  const [showKIE, setShowKIE] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const { register, handleSubmit } = useForm<FormActionType>({ defaultValues });

  const handleActionChange = (index, key, value) => {
    setActions(
      actions.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          [key]: value,
        };
      })
    );
  };

  const handleBmhpChange = (index, key, value) => {
    setBmhp(
      bmhp.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          [key]: value,
        };
      })
    );
  };

  const handleAddAction = () => {
    setActions([...actions, { name: "", quantity: 1 }]);
  };

  const handleAddBmhp = () => {
    setBmhp([...bmhp, { name: "", quantity: 1 }]);
  };

  const handleDeleteAction = (index) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleDeleteBmhp = (index) => {
    setBmhp(bmhp.filter((_, i) => i !== index));
  };

  const submitForm = (val: FormActionType) => {
    console.log(val);
    onSubmit({ ...val, actions, bmhp });
  };

  if (!show) return null;

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-6 p-6">
        <div className="grid gap-2">
          <Toggle
            value={showKIE}
            onSwitch={setShowKIE}
            {...register("with_kie")}
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

              <div className="col-span-4 my-4">
                <Typography bold as="h5" className="mb-4">
                  Tindakan
                </Typography>
                <CardAction
                  items={actions}
                  onAdd={handleAddAction}
                  onDelete={handleDeleteAction}
                  onChange={handleActionChange}
                />
              </div>
              <div className="col-span-4 my-4">
                <Typography bold as="h5" className="mb-4">
                  Bahan Medis Habis Pakai (BMHP)
                </Typography>
                <CardBMHP
                  items={bmhp}
                  onAdd={handleAddBmhp}
                  onDelete={handleDeleteBmhp}
                  onChange={handleBmhpChange}
                />
              </div>
              <div className="col-span-4 flex items-start gap-6">
                <CheckBox
                  required
                  {...register("consent", {
                    required: {
                      value: true,
                      message: "Consent belum disetujui",
                    },
                  })}
                >
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
      </div>
      {navigation}
    </form>
  );
};

export default Step4Action;
