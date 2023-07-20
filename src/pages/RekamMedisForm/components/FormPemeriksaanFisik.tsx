import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "components/FormInput/Input";
import ModalSelectOrgan from "./ModalSelectOrgan";
import TextArea from "components/FormInput/TextArea";
import { FaTrashAlt } from "react-icons/fa";
import ButtonAddMore from "components/ButtonAddMore";
import ComboBox from "components/FormInput/ComboBox";
import FormSection from "components/FormSection";
import Typography from "components/Typography";

interface Organ {
  name: string;
}

interface FormPemeriksaanFisikType {
  senses_level: string;
  psychological_state: string;
  height: number;
  weight: number;
  bmi: number;
  blood_pressure_sistole: number;
  blood_pressure_diastole: number;
  spo2: number;
  temperature: number;
  pulse_rate: number;
  respiration_rate: number;
}

const FormPemeriksaanFisik = () => {
  const [showOrganModal, setShowOrganModal] = useState(false);
  const [organNotes, setOrganNotes] = useState<Organ[]>([]);
  const { register, handleSubmit, watch, setValue } =
    useForm<FormPemeriksaanFisikType>();

  const watchHeight = watch("height");
  const watchWeight = watch("weight");

  useEffect(() => {
    const weightKgNum = Number(watchWeight);
    const heightMeterNum = Number(watchHeight) / 100;
    const bmiVal = weightKgNum / Math.pow(heightMeterNum, 2) || (0 as any);
    console.log(typeof bmiVal);
    setValue("bmi", bmiVal.toFixed(2));
  }, [setValue, watchHeight, watchWeight]);

  const handleAddOrganNote = (values: Organ[]) => {
    setShowOrganModal(false);
    setOrganNotes(values);
  };

  const handleDeleteNote = (name: string) => {
    setOrganNotes(organNotes.filter((item) => item.name !== name));
  };

  const onSubmit = (val: FormPemeriksaanFisikType) => {
    console.log(val);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Keadaan Umum">
          <div className="grid grid-cols-12 gap-6">
            <ComboBox
              label="Tingkat Kesadaran"
              placeholder="Pilih tingkat kesadaran pasien"
              className="col-span-12 md:col-span-6"
              options={[
                { key: 1, label: "Sadar Baik / Alert" },
                { key: 2, label: "Verbal" },
                { key: 3, label: "Pain" },
                { key: 4, label: "Unresponsive" },
                { key: 5, label: "Apatis" },
              ]}
              {...register("psychological_state")}
            />
            <ComboBox
              label="Status Psikologi"
              placeholder="Pilih status psikologi pasien"
              className="col-span-12 md:col-span-6"
              options={[
                { key: "Tidak ada kelainan", label: "Tidak ada kelainan" },
                { key: "Cemas", label: "Cemas" },
                { key: "Marah", label: "Marah" },
                { key: "Sedih", label: "Sedih" },
                { key: "Lain-lain", label: "Lain-lain" },
              ]}
              {...register("psychological_state")}
            />
            <Input
              suffix="cm"
              label="Tinggi badan"
              type="number"
              placeholder="0"
              className="col-span-6 md:col-span-4"
              {...register("height", {
                min: 0,
              })}
            />
            <Input
              suffix="kg"
              label="Berat badan"
              type="number"
              placeholder="0"
              className="col-span-6 md:col-span-4"
              {...register("weight", {
                min: 0,
              })}
            />
            <Input
              readOnly
              label="BMI"
              type="text"
              placeholder="0"
              className="col-span-6 md:col-span-4"
              {...register("bmi")}
            />
          </div>
        </FormSection>
        <FormSection title="Vital Sign">
          <div className="grid grid-cols-12 gap-6">
            <Input
              suffix="mmHg"
              label="Sistole"
              type="number"
              placeholder="0"
              className="col-span-12 md:col-span-4"
              {...register("blood_pressure_sistole")}
            />
            <Input
              suffix="mmHg"
              label="Diastole"
              type="number"
              placeholder="0"
              className="col-span-12 md:col-span-4"
              {...register("blood_pressure_diastole")}
            />
            <Input
              suffix="%"
              label="SpO2"
              type="number"
              placeholder="0"
              className="col-span-12 md:col-span-4"
              {...register("spo2", {
                min: 0,
                max: 100,
              })}
            />
            <Input
              suffix="°C"
              label="Suhu Tubuh"
              type="number"
              placeholder="0"
              className="col-span-12 md:col-span-4"
              {...register("temperature", {
                min: 0,
                max: 100,
              })}
            />
            <Input
              suffix="/menit"
              label="Denyut Nadi"
              type="number"
              placeholder="0"
              className="col-span-12 md:col-span-4"
              {...register("pulse_rate", {
                min: 0,
              })}
            />
            <Input
              suffix="/menit"
              label="Pernafasan"
              type="number"
              placeholder="0"
              className="col-span-12 md:col-span-4"
              {...register("respiration_rate", {
                min: 0,
              })}
            />
          </div>
        </FormSection>
        <FormSection title="Catatan Kondisi Tubuh">
          <div className="grid grid-cols-2 gap-6">
            {organNotes.map((item, index) => (
              <div
                key={index}
                className="col-span-2 flex items-center justify-between gap-4"
              >
                <div className="grow">
                  <TextArea
                    label={`Catatan Kondisi ${item.name}`}
                    name={`note-${item.name.toLowerCase().replace(" ", "")}`}
                    placeholder={`Tuliskan kondisi ${item.name.toLowerCase()} pasien`}
                    rows={2}
                  />
                </div>
                <FaTrashAlt
                  className="font-xl shrink-0 cursor-pointer text-gray-500 hover:text-gray-400"
                  onClick={() => handleDeleteNote(item.name)}
                />
              </div>
            ))}
            {organNotes.length === 0 && (
              <div className="col-span-2">
                <Typography small className="w-full text-center !text-gray-500">
                  Belum ada catatan
                </Typography>
              </div>
            )}
            <div className="col-span-2">
              <ButtonAddMore onClick={() => setShowOrganModal(true)}>
                Tambah Catatan
              </ButtonAddMore>
            </div>
          </div>
        </FormSection>
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

export default FormPemeriksaanFisik;
