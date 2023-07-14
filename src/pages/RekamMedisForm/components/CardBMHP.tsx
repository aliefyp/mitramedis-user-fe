import ButtonAddMore from "components/ButtonAddMore";
import Card from "components/Card";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import Label from "components/FormInput/Label";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const CardBMHP = ({ register, items, onDelete, onAdd }) => {
  return (
    <Card className="col-span-2 grid grid-cols-10 items-center gap-4 border p-4 ">
      <div className="col-span-6">
        <Label>Bahan Medis Habis Pakai (BMHP)</Label>
      </div>
      <div className="col-span-3">
        <Label>Jumlah Tindakan</Label>
      </div>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ComboBox
            type="text"
            className="col-span-6"
            placeholder="Pilih BMHP yang digunakan untuk tindakan"
            options={[
              { key: 1, label: "test 1" },
              { key: 2, label: "test 2" },
            ]}
            {...register("bmhp_name")}
          />

          <Input
            type="number"
            className="col-span-3"
            placeholder="1"
            defaultValue="1"
            {...register("bmhp_count")}
          />

          <FaTrashAlt
            className="font-xl col-span-1 cursor-pointer text-gray-500 hover:text-gray-400"
            onClick={() => onDelete(index)}
          />
        </React.Fragment>
      ))}

      <ButtonAddMore className="col-span-10" onClick={onAdd}>
        Tambah Tindakan
      </ButtonAddMore>
    </Card>
  );
};

export default CardBMHP;
