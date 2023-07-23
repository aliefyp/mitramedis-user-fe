import ComboBox from "components/FormInput/ComboBox";
import { useForm } from "react-hook-form";

interface StatusType {
  status: string;
}

const Step6Status = () => {
  const { register } = useForm<StatusType>();

  return (
    <div className="py-6">
      <ComboBox
        required
        label="Status Pasien"
        placeholder="Pilih Status Pasien"
        options={[
          { key: 1, label: "Pulang" },
          { key: 2, label: "Rujuk Rawat Jalan" },
          { key: 3, label: "Rujuk Rawat Inap" },
          { key: 1, label: "Meninggal" },
        ]}
        className="col-span-4 md:col-span-2"
        {...register("status", {
          required: {
            value: true,
            message: "Wajib diisi",
          },
        })}
      />
    </div>
  );
};

export default Step6Status;
