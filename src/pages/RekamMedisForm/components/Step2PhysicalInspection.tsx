import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "components/FormInput/Input";
import ModalSelectOrgan from "./ModalSelectOrgan";
import TextArea from "components/FormInput/TextArea";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import ButtonAddMore from "components/ButtonAddMore";
import ComboBox from "components/FormInput/ComboBox";
import FormSection from "components/FormSection";
import EmptyData from "components/EmptyData";
import { FormPhysicalInspectionType, PhysicalOrgans } from "../interface";
import useBmi from "hooks/useBmi";
import { Badge, Tooltip } from "flowbite-react";

interface Organ {
  key: PhysicalOrgans;
  label: string;
}

const Step2PhysicalInspection = ({
  show,
  defaultValues,
  navigation,
  onSubmit,
}) => {
  const [showOrganModal, setShowOrganModal] = useState(false);
  const [organNotes, setOrganNotes] = useState<Organ[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormPhysicalInspectionType>({ defaultValues });

  const watchHeight = watch("height");
  const watchWeight = watch("weight");

  const { score, status, color } = useBmi({
    weight: watchWeight,
    height: watchHeight,
  });

  useEffect(() => {
    setValue("bmi", Number(score));
  }, [score, setValue]);

  const handleAddOrganNote = (values: Organ[]) => {
    setShowOrganModal(false);
    setOrganNotes(values);
  };

  const handleDeleteNote = (key: string) => {
    setOrganNotes(organNotes.filter((item) => item.key !== key));
  };

  const submitForm = (val: FormPhysicalInspectionType) => {
    console.log(val);
    onSubmit(val);
  };

  if (!show) return null;

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="px-6">
          <FormSection title="Keadaan Umum">
            <div className="grid grid-cols-12 gap-6">
              <ComboBox
                required
                label="Tingkat Kesadaran"
                placeholder="Pilih tingkat kesadaran pasien"
                className="col-span-12 md:col-span-6"
                error={Boolean(errors?.senses_level)}
                helper={errors?.senses_level?.message}
                onValueChange={(val) => setValue("senses_level", val.label)}
                options={[
                  { key: 1, label: "Sadar Baik / Alert" },
                  { key: 2, label: "Verbal" },
                  { key: 3, label: "Pain" },
                  { key: 4, label: "Unresponsive" },
                  { key: 5, label: "Apatis" },
                ]}
                {...register("senses_level", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
              <ComboBox
                required
                label="Status Psikologi"
                placeholder="Pilih status psikologi pasien"
                className="col-span-12 md:col-span-6"
                error={Boolean(errors?.psychological_state)}
                helper={errors?.psychological_state?.message}
                onValueChange={(val) =>
                  setValue("psychological_state", val.label)
                }
                options={[
                  { key: "Tidak ada kelainan", label: "Tidak ada kelainan" },
                  { key: "Cemas", label: "Cemas" },
                  { key: "Marah", label: "Marah" },
                  { key: "Sedih", label: "Sedih" },
                  { key: "Lain-lain", label: "Lain-lain" },
                ]}
                {...register("psychological_state", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
              <Input
                required
                suffix="cm"
                label="Tinggi badan"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.height)}
                helper={errors?.height?.message}
                {...register("height", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                  min: {
                    value: 0,
                    message: "Input tidak valid",
                  },
                })}
              />
              <Input
                required
                suffix="kg"
                label="Berat badan"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.weight)}
                helper={errors?.weight?.message}
                {...register("weight", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                  min: {
                    value: 0,
                    message: "Input tidak valid",
                  },
                })}
              />
              <div className="col-span-12 flex items-center gap-2 md:col-span-4">
                <Input
                  readOnly
                  label="BMI (Otomatis)"
                  type="text"
                  placeholder="0"
                  className="col-span-3 md:col-span-2"
                  {...register("bmi")}
                />
                <Tooltip content=" < 18.5 = underweight | 18.5 - 24.9 = normal | 25.0 - 29.9 = overweight | > 30.0 = obesity">
                  <Badge size="xs" color={color} className="mt-2">
                    <div className="flex items-center gap-2">
                      {status}
                      <FaInfoCircle />
                    </div>
                  </Badge>
                </Tooltip>
              </div>
            </div>
          </FormSection>
          <FormSection title="Vital Sign">
            <div className="grid grid-cols-12 gap-6">
              <Input
                required
                suffix="mmHg"
                label="Sistole"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.blood_pressure_sistole)}
                helper={errors?.blood_pressure_sistole?.message}
                {...register("blood_pressure_sistole", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                  min: {
                    value: 0,
                    message: "Input tidak valid",
                  },
                })}
              />
              <Input
                required
                suffix="mmHg"
                label="Diastole"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.blood_pressure_diastole)}
                helper={errors?.blood_pressure_diastole?.message}
                {...register("blood_pressure_diastole", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                  min: {
                    value: 0,
                    message: "Input tidak valid",
                  },
                })}
              />
              <Input
                suffix="%"
                label="SpO2"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                {...register("spo2", {
                  min: 0,
                  max: 100,
                })}
              />
              <Input
                required
                suffix="°C"
                label="Suhu Tubuh"
                type="number"
                step=".01"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.temperature)}
                helper={errors?.temperature?.message}
                {...register("temperature", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                  min: {
                    value: 0,
                    message: "Input tidak valid",
                  },
                  max: {
                    value: 100,
                    message: "Input tidak valid",
                  },
                })}
              />
              <Input
                required
                suffix="/menit"
                label="Denyut Nadi"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.pulse_rate)}
                helper={errors?.pulse_rate?.message}
                {...register("pulse_rate", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
              <Input
                required
                suffix="/menit"
                label="Pernafasan"
                type="number"
                placeholder="0"
                className="col-span-6 md:col-span-4"
                error={Boolean(errors?.respiration_rate)}
                helper={errors?.respiration_rate?.message}
                {...register("respiration_rate", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
            </div>
          </FormSection>
          <FormSection title="Catatan Kondisi Tubuh">
            <div className="grid grid-cols-2 gap-4">
              {organNotes.map((item, index) => (
                <div
                  key={index}
                  className="col-span-2 flex items-center justify-between gap-4"
                >
                  <div className="grow">
                    <TextArea
                      rows={2}
                      label={`Catatan Kondisi ${item.label}`}
                      placeholder={`Tuliskan kondisi ${item.label.toLowerCase()} pasien`}
                      {...register(item.key)}
                    />
                  </div>
                  <FaTrashAlt
                    className="font-xl shrink-0 cursor-pointer text-gray-500 hover:text-gray-400"
                    onClick={() => handleDeleteNote(item.key)}
                  />
                </div>
              ))}
              {organNotes.length === 0 && (
                <div className="col-span-2">
                  <EmptyData>Belum ada catatan</EmptyData>
                </div>
              )}
              <div className="col-span-2">
                <ButtonAddMore onClick={() => setShowOrganModal(true)}>
                  Tambah Catatan
                </ButtonAddMore>
              </div>
            </div>
          </FormSection>
          <FormSection title="Pemeriksaan Penunjang">
            <TextArea
              rows={2}
              label="Catatan Penunjang"
              placeholder="Tuliskan catatan untuk pemeriksaan penunjang"
              {...register("support_note")}
            />
          </FormSection>
        </div>
        {navigation}
      </form>

      <ModalSelectOrgan
        open={showOrganModal}
        defaultSelected={organNotes}
        onClose={() => setShowOrganModal(false)}
        onSubmit={handleAddOrganNote}
      />
    </>
  );
};

export default Step2PhysicalInspection;
