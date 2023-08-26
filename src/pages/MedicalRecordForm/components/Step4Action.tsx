import { Controller, useFieldArray, useForm } from "react-hook-form";
import Typography from "components/Typography";
import Card from "components/Card";

import CardAction from "./CardAction";
import CardBMHP from "./CardBMHP";
import { FormActionType } from "../interface";
import {
  Checkbox,
  Label,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";

const Step4Action = ({ show, defaultValues, navigation, onSubmit }) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormActionType>({
    defaultValues,
  });

  const {
    fields: fieldsActions,
    append: appendActions,
    remove: removeActions,
  } = useFieldArray({
    control,
    name: "actions",
  });

  const {
    fields: fieldsBmhp,
    append: appendBmhp,
    remove: removeBmhp,
  } = useFieldArray({
    control,
    name: "bmhp",
  });

  const watchWithKie = watch("with_kie");
  const watchAction = watch("with_action");

  const submitForm = (val: FormActionType) => {
    console.log(val);
    // onSubmit({ ...val, actions, bmhp });
  };

  if (!show) return null;

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-6 p-6">
        <div className="grid gap-2">
          <Controller
            control={control}
            name="with_kie"
            render={({ field: { onChange, value } }) => (
              <ToggleSwitch
                label="Ada KIE (Komunikasi, Informasi, Edukasi)"
                checked={Boolean(value)}
                onChange={onChange}
              />
            )}
          />
          {watchWithKie && (
            <Textarea
              placeholder="Tuliskan KIE yang disarankan pada pasien"
              color={Boolean(errors?.kie) ? "failure" : "gray"}
              helperText={Boolean(errors?.kie?.message)}
              {...register("kie", {
                required: {
                  value: watchWithKie,
                  message: "Wajib diisi",
                },
              })}
            />
          )}
        </div>
        <div className="grid gap-4">
          <Controller
            control={control}
            name="with_action"
            render={({ field: { onChange, value } }) => (
              <ToggleSwitch
                label="Ada Tindakan"
                checked={Boolean(value)}
                onChange={onChange}
              />
            )}
          />
          {watchAction && (
            <Card className="grid grid-cols-4 items-end gap-6 rounded-lg border p-4">
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="created_date" value="Tanggal" />
                <TextInput
                  type="date"
                  color={Boolean(errors?.created_date) ? "failure" : "gray"}
                  helperText={errors?.created_date?.message}
                  {...register("created_date")}
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="created_time" value="Waktu" />
                <TextInput
                  type="time"
                  color={Boolean(errors?.created_time) ? "failure" : "gray"}
                  helperText={errors?.created_time?.message}
                  {...register("created_time")}
                />
              </div>

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
                  register={register}
                  errors={errors}
                  control={control}
                  fields={fieldsActions}
                  append={appendActions}
                  remove={removeActions}
                />
              </div>
              <div className="col-span-4 my-4">
                <Typography bold as="h5" className="mb-4">
                  Bahan Medis Habis Pakai (BMHP)
                </Typography>
                <CardBMHP
                  register={register}
                  errors={errors}
                  control={control}
                  fields={fieldsBmhp}
                  append={appendBmhp}
                  remove={removeBmhp}
                />
              </div>
              <div className="col-span-4 flex items-start gap-2 ">
                <Checkbox
                  {...register("consent", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                />
                <Label htmlFor="consent">
                  <Typography>
                    Pasien telah diberikan penjelasan dan menyetujui Persetujuan
                    Tindakan (<i>Informed Consent</i>).{" "}
                    <Typography link as="span" className="cursor-pointer ">
                      Klik disini untuk cetak Informed Consent.
                    </Typography>
                  </Typography>
                </Label>
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
