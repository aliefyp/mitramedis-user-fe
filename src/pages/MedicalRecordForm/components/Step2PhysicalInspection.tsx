import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Badge,
  Label,
  Select,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import ButtonAddMore from "components/ButtonAddMore";
import FormSection from "components/FormSection";
import EmptyData from "components/EmptyData";
import Typography from "components/Typography";
import { FormPhysicalInspectionType, PhysicalOrgans } from "../interface";
import useBmi from "hooks/useBmi";
import ModalSelectOrgan from "./ModalSelectOrgan";
import {
  OPTIONS_PHYSCOLOGYCAL_STATUS,
  OPTIONS_SENSES_LEVEL,
} from "../constants";

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
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <div className="px-6">
          <FormSection title="Keadaan Umum">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6">
                <Label htmlFor="senses_level" value="Tingkat Kesadaran" />
                <Select
                  required
                  defaultValue=""
                  color={Boolean(errors?.senses_level) ? "failure" : "gray"}
                  helperText={errors?.senses_level?.message}
                  {...register("senses_level", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                >
                  <option value="" disabled>
                    Pilih tingkat kesadaran pasien
                  </option>
                  {OPTIONS_SENSES_LEVEL.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label htmlFor="psychological_state" value="Status Psikologi" />
                <Select
                  required
                  defaultValue=""
                  color={
                    Boolean(errors?.psychological_state) ? "failure" : "gray"
                  }
                  helperText={errors?.psychological_state?.message}
                  {...register("psychological_state", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                >
                  <option value="" disabled>
                    Pilih status psikologi pasien
                  </option>
                  {OPTIONS_PHYSCOLOGYCAL_STATUS.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="height" value="Tinggi badan" />
                <TextInput
                  required
                  addon="cm"
                  type="number"
                  step={10}
                  placeholder="0"
                  color={Boolean(errors?.height) ? "failure" : "gray"}
                  helperText={errors?.height?.message}
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
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="weight" value="Berat badan" />
                <TextInput
                  required
                  addon="kg"
                  type="number"
                  step={10}
                  placeholder="0"
                  className="col-span-6 md:col-span-4"
                  color={Boolean(errors?.weight) ? "failure" : "gray"}
                  helperText={errors?.weight?.message}
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
              </div>

              <div className="col-span-12  md:col-span-4">
                <Label value="Skor BMI" />
                <div className="mt-2 flex items-center gap-2">
                  <Typography bold className={`text-3xl text-${color}-700`}>
                    {score}
                  </Typography>
                  <Tooltip
                    className="m-0"
                    content=" < 18.5 = underweight | 18.5 - 24.9 = normal | 25.0 - 29.9 = overweight | > 30.0 = obesity"
                  >
                    <Badge size="xs" color={color}>
                      <div className="flex items-center gap-2">
                        {status}
                        <FaInfoCircle />
                      </div>
                    </Badge>
                  </Tooltip>
                </div>
              </div>
            </div>
          </FormSection>
          <FormSection title="Vital Sign">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="blood_pressure_sistole" value="Sistole" />
                <TextInput
                  required
                  addon="mmHg"
                  type="number"
                  placeholder="0"
                  step={10}
                  color={
                    Boolean(errors?.blood_pressure_sistole) ? "failure" : "gray"
                  }
                  helperText={errors?.blood_pressure_sistole?.message}
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
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="blood_pressure_diastole" value="Diastole" />
                <TextInput
                  required
                  addon="mmHg"
                  type="number"
                  placeholder="0"
                  step={10}
                  color={
                    Boolean(errors?.blood_pressure_diastole)
                      ? "failure"
                      : "gray"
                  }
                  helperText={errors?.blood_pressure_diastole?.message}
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
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="spo2" value="SpO2" />
                <TextInput
                  addon="%"
                  type="number"
                  step={10}
                  placeholder="0"
                  {...register("spo2", {
                    min: 0,
                    max: 100,
                  })}
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="temperature" value="Suhu Tubuh" />
                <TextInput
                  required
                  addon="°C"
                  type="number"
                  step={10}
                  placeholder="0"
                  color={Boolean(errors?.temperature) ? "failure" : "gray"}
                  helperText={errors?.temperature?.message}
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
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="pulse_rate" value="Denyut Nadi" />
                <TextInput
                  required
                  addon="/menit"
                  type="number"
                  placeholder="0"
                  color={Boolean(errors?.pulse_rate) ? "failure" : "gray"}
                  helperText={errors?.pulse_rate?.message}
                  {...register("pulse_rate", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <Label htmlFor="respiration_rate" value="Pernafasan" />
                <TextInput
                  required
                  addon="/menit"
                  type="number"
                  placeholder="0"
                  color={Boolean(errors?.respiration_rate) ? "failure" : "gray"}
                  helperText={errors?.respiration_rate?.message}
                  {...register("respiration_rate", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                />
              </div>
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
                    <Label
                      htmlFor={item.key}
                      value={`Catatan Kondisi ${item.label}`}
                    />
                    <Textarea
                      required
                      rows={2}
                      color={Boolean(errors?.[item.key]) ? "failure" : "gray"}
                      helperText={errors?.[item.key]?.message}
                      placeholder={`Tuliskan kondisi ${item.label.toLowerCase()} pasien`}
                      {...register(item.key, {
                        required: {
                          value: true,
                          message: "Wajib diisi",
                        },
                      })}
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
            <Label htmlFor="support_note" value="Catatan Penunjang" />
            <Textarea
              rows={2}
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
