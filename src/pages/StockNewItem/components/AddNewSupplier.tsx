import Button from "components/Button";
import Input from "components/FormInput/Input";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import ModalHeader from "components/ModalHeader";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormSupplierType {
  supplier_name: string;
}

const AddNewSupplier = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSupplierType>();

  const submitForm = (val: FormSupplierType) => {
    onSubmit(val);
  };

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(submitForm)}>
        <ModalHeader>Supplier Baru</ModalHeader>
        <ModalBody>
          <Input
            autoFocus={open}
            label="Nama Supplier"
            error={Boolean(errors?.supplier_name)}
            helper={errors?.supplier_name?.message}
            className="pb-4 pt-2"
            {...register("supplier_name", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={onClose}>
            Kembali
          </Button>
          <Button type="submit" color="primary">
            Simpan
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddNewSupplier;
