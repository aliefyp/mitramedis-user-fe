import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Select from "components/Select";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Typography from "components/Typography";
import Card from "components/Card";
import TextArea from "components/TextArea";
import Input from "components/Input";

interface FormDiagnosisType {
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

const FormDiagnosis = () => {
  const [actions, setActions] = useState([]);
  const [bmhp, setBmhp] = useState([]);
  const { register, handleSubmit } = useForm<FormDiagnosisType>();

  const onSubmit = (val: FormDiagnosisType) => {
    console.log(val);
  };

  return (
    <form className="grid grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
      <section className="col-span-3 mb-6 grid gap-2 2xl:col-span-2">
        <Typography as="h3" className="font-bold">
          KIE
        </Typography>
        <TextArea
          placeholder="Tuliskan KIE yang disarankan pada pasien"
          {...register("kie")}
        />
      </section>
      <section className="col-span-3 mb-6 grid grid-cols-2 gap-6 2xl:col-span-2">
        <Typography as="h3" className="col-span-2 font-bold">
          Tindakan
        </Typography>
        <div className="col-span-2 flex items-start gap-2">
          <Input type="checkbox" {...register("consent")} />
          <Typography>
            Pasien telah diberikan penjelasan dan menyetujui Persetujuan
            Tindakan (<i>Informed Consent</i>).{" "}
            <Typography link as="span" className="cursor-pointer ">
              Klik disini untuk cetak Informed Consent.
            </Typography>
          </Typography>
        </div>

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
          type="text"
          className="col-span-2 md:col-span-1"
          placeholder="DD/MM/YYYY"
          {...register("created_date")}
        />

        <Input
          suffix="WIB"
          label="Waktu Pelaksanaan Tindakan"
          type="text"
          className="col-span-2 md:col-span-1"
          placeholder="HH:mm"
          {...register("created_time")}
        />

        <Card className="col-span-2 grid grid-cols-10 items-center gap-4 rounded-2xl border p-4 shadow-lg">
          <div className="col-span-6">
            <Input.Label>Nama Tindakan</Input.Label>
          </div>
          <div className="col-span-3">
            <Input.Label>Jumlah Tindakan</Input.Label>
          </div>
          {actions.map((item, index) => (
            <React.Fragment key={index}>
              <Select
                type="text"
                className="col-span-6"
                placeholder="Cari tindakan di sini"
                items={["test 1", "test 2"]}
                {...register("action_name")}
              />

              <Input
                type="number"
                className="col-span-3"
                placeholder="1"
                defaultValue="1"
                {...register("action_count")}
              />

              <FaTrashAlt
                className="font-xl col-span-1 cursor-pointer text-gray-500 hover:text-gray-400"
                onClick={() =>
                  setActions(actions.filter((_, i) => i !== index))
                }
              />
            </React.Fragment>
          ))}
          <div
            className="col-span-10 flex h-[48px] cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed"
            onClick={() => setActions([...actions, actions.length])}
          >
            <FaPlus className="text-gray-700" />
            <Typography bold className="text-gray-700">
              Tambah Tindakan
            </Typography>
          </div>
        </Card>

        <Card className="col-span-2 grid grid-cols-10 items-center gap-4 rounded-2xl border p-4 shadow-lg">
          <div className="col-span-6">
            <Input.Label>Bahan Medis Habis Pakai (BMHP)</Input.Label>
          </div>
          <div className="col-span-3">
            <Input.Label>Jumlah</Input.Label>
          </div>
          {bmhp.map((item, index) => (
            <React.Fragment key={index}>
              <Select
                type="text"
                className="col-span-6"
                placeholder="Pilih BMHP yang digunakan untuk tindakan"
                items={["test 1", "test 2"]}
                {...register("action_name")}
              />

              <Input
                type="number"
                className="col-span-3"
                placeholder="1"
                defaultValue="1"
                {...register("action_count")}
              />

              <FaTrashAlt
                className="font-xl col-span-1 cursor-pointer text-gray-500 hover:text-gray-400"
                onClick={() => setBmhp(bmhp.filter((_, i) => i !== index))}
              />
            </React.Fragment>
          ))}
          <div
            className="col-span-10 flex h-[48px] cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed"
            onClick={() => setBmhp([...bmhp, bmhp.length])}
          >
            <FaPlus className="text-gray-700" />
            <Typography bold className="text-gray-700">
              Tambah BMHP
            </Typography>
          </div>
        </Card>
      </section>
    </form>
  );
};

export default FormDiagnosis;
