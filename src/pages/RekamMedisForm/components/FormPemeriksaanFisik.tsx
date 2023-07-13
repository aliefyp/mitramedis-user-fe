import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "components/Select";
import Input from "components/Input";
import Typography from "components/Typography";
import ModalSelectOrgan from "./ModalSelectOrgan";
import TextArea from "components/TextArea";
import { FaTrashAlt } from "react-icons/fa";
import ButtonGroup from "components/ButtonGroup";
import ButtonAddMore from "components/ButtonAddMore";

const SENSES_LEVEL = [
  "Sadar Baik / Alert",
  "Verbal",
  "Pain",
  "Unresponsive",
  "Apatis",
];

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
  const [sensesLevel, setSensesLevel] = useState("");
  const [organNotes, setOrganNotes] = useState<Organ[]>([]);
  const { register, handleSubmit } = useForm<FormPemeriksaanFisikType>();

  const handleAddOrganNote = (values: Organ[]) => {
    setShowOrganModal(false);
    setOrganNotes(values);
  };

  const handleDeleteNote = (name: string) => {
    setOrganNotes(organNotes.filter((item) => item.name !== name));
  };

  const handleSelectSensesLevel = (level: string) => {
    setSensesLevel(level);
  };

  const onSubmit = (val: FormPemeriksaanFisikType) => {
    console.log(val);
  };

  return (
    <form className="grid grid-cols-3 " onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-3 grid grid-cols-2 gap-6 2xl:col-span-2">
        <Typography as="h3" className="col-span-2 font-bold">
          Keadaan Umum Pasien
        </Typography>
        <div className="col-span-2 space-y-2">
          <Input.Label>Tingkat Kesadaran</Input.Label>
          <ButtonGroup
            items={SENSES_LEVEL.map((item) => ({
              text: item,
              color: sensesLevel === item ? "primary" : "secondary",
              onClick: () => handleSelectSensesLevel(item),
            }))}
          />
        </div>
        <Select
          id="psychological_state"
          placeholder="Pilih status psikologi pasien"
          label="Status Psikologi"
          items={["Tidak ada kelainan", "Cemas", "Marah", "Sedih", "Lain-lain"]}
          className="col-span-2 md:col-span-2"
          {...register("psychological_state")}
        />
        <Input
          suffix="cm"
          label="Tinggi badan"
          type="text"
          placeholder="0"
          className="col-span-2 md:col-span-1"
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

        <Typography as="h3" className="col-span-2 mt-4 font-bold">
          Vital Sign
        </Typography>
        <Input
          suffix="mmHg"
          label="Tekanan Darah Sistole"
          type="text"
          placeholder="0"
          className="col-span-2 md:col-span-1"
          {...register("blood_pressure_sistole")}
        />
        <Input
          suffix="mmHg"
          label="Tekanan Darah Diastole"
          type="text"
          placeholder="0"
          className="col-span-2 md:col-span-1"
          {...register("blood_pressure_diastole")}
        />
        <Input
          suffix="°C"
          label="Suhu Tubuh"
          type="text"
          placeholder="0"
          className="col-span-2 md:col-span-1"
          {...register("temperature")}
        />
        <Input
          suffix="/menit"
          label="Denyut Nadi"
          type="text"
          placeholder="0"
          className="col-span-2 md:col-span-1"
          {...register("pulse_rate")}
        />
        <Input
          suffix="/menit"
          label="Pernafasan"
          type="text"
          placeholder="0"
          className="col-span-2 md:col-span-1"
          {...register("respiration_rate")}
        />

        <Typography as="h3" className="col-span-2 mt-4 font-bold">
          Catatan Kondisi Tubuh
        </Typography>
        {organNotes.map((item, index) => (
          <div
            key={index}
            className="col-span-2 col-start-1 flex items-center justify-between gap-4"
          >
            <div className="flex w-[64px] flex-col items-center gap-2">
              <img src="http://www.placehold.it/32x32" alt={item.name} />
              <Typography smaller className="text-center font-semibold">
                {item.name}
              </Typography>
            </div>
            <div className="grow">
              <TextArea
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
        <div className="col-span-2 col-start-1">
          <ButtonAddMore onClick={() => setShowOrganModal(true)}>
            Tambah Catatan
          </ButtonAddMore>
        </div>

        <ModalSelectOrgan
          open={showOrganModal}
          defaultSelected={organNotes}
          onClose={() => setShowOrganModal(false)}
          onSubmit={handleAddOrganNote}
        />
      </div>
    </form>
  );
};

export default FormPemeriksaanFisik;
