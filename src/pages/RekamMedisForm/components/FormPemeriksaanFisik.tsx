import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "components/FormInput/Input";
import ModalSelectOrgan from "./ModalSelectOrgan";
import TextArea from "components/FormInput/TextArea";
import { FaTrashAlt } from "react-icons/fa";
import ButtonAddMore from "components/ButtonAddMore";
import Combobox from "components/FormInput/ComboBox";
import Section from "./Section";

interface Organ {
  name: string;
}

interface FormPemeriksaanFisikType {
  senses_level: string;
  psychological_state: string;
  height: number;
  weight: number;
  blood_pressure_sistole: number;
  blood_pressure_diastole: number;
  temperature: number;
  pulse_rate: number;
  respiration_rate: number;
}

const FormPemeriksaanFisik = () => {
  const [showOrganModal, setShowOrganModal] = useState(false);
  const [organNotes, setOrganNotes] = useState<Organ[]>([]);
  const { register, handleSubmit } = useForm<FormPemeriksaanFisikType>();

  const handleAddOrganNote = (values: Organ[]) => {
    setShowOrganModal(false);
    setOrganNotes(values);
  };

  const handleDeleteNote = (name: string) => {
    setOrganNotes(organNotes.filter((item) => item.name !== name));
  };

  // const handleSelectSensesLevel = (level: string) => {
  //   setSensesLevel(level);
  // };

  const onSubmit = (val: FormPemeriksaanFisikType) => {
    console.log(val);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section title="Keadaan Umum">
          <div className="grid grid-cols-2 gap-6">
            {/* <div className="col-span-2 space-y-2">
              <Input.Label>Tingkat Kesadaran</Input.Label>
              <ButtonGroup
                items={SENSES_LEVEL.map((item) => ({
                  text: item,
                  color: sensesLevel === item ? "primary" : "secondary",
                  onClick: () => handleSelectSensesLevel(item),
                }))}
              />
            </div> */}
            <Combobox
              label="Tingkat Kesadaran"
              placeholder="Pilih tingkat kesadaran pasien"
              className="col-span-2"
              options={[
                { key: 1, label: "Sadar Baik / Alert" },
                { key: 2, label: "Verbal" },
                { key: 3, label: "Pain" },
                { key: 4, label: "Unresponsive" },
                { key: 5, label: "Apatis" },
              ]}
              {...register("psychological_state")}
            />
            <Combobox
              label="Status Psikologi"
              placeholder="Pilih status psikologi pasien"
              className="col-span-2"
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
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("height")}
            />
            <Input
              suffix="kg"
              label="Berat badan"
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("weight")}
            />
          </div>
        </Section>
        <Section title="Vital Sign">
          <div className="grid grid-cols-2 gap-6">
            <Input
              suffix="mmHg"
              label="Sistole"
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("blood_pressure_sistole")}
            />
            <Input
              suffix="mmHg"
              label="Diastole"
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("blood_pressure_diastole")}
            />
            <Input
              suffix="°C"
              label="Suhu Tubuh"
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("temperature")}
            />
            <Input
              suffix="/menit"
              label="Denyut Nadi"
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("pulse_rate")}
            />
            <Input
              suffix="/menit"
              label="Pernafasan"
              type="text"
              placeholder="0"
              className="col-span-1"
              {...register("respiration_rate")}
            />
          </div>
        </Section>
        <Section title="Catatan Kondisi Tubuh">
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
            <div className="col-span-2">
              <ButtonAddMore onClick={() => setShowOrganModal(true)}>
                Tambah Catatan
              </ButtonAddMore>
            </div>
          </div>
        </Section>
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
