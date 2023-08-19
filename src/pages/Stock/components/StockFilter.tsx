import Card from "components/Card";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import { TbSearch } from "react-icons/tb";
import { useForm } from "react-hook-form";

interface StockFilterParam {
  query: string;
}

interface StockFilterProps {
  onSubmit: (val: StockFilterParam) => void;
}

const StockFilter = ({ onSubmit }: StockFilterProps) => {
  const { register, handleSubmit } = useForm<StockFilterParam>();

  const submitForm = (val: StockFilterParam) => {
    onSubmit(val);
  };

  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="col-span-2 sm:col-span-1">
            <Input
              type="search"
              placeholder="Cari kode, nama produk atau kategori"
              {...register("query")}
            />
          </div>
          <div className="col-span-2 flex h-full items-end justify-start sm:col-span-1">
            <Button type="submit" color="secondary">
              <div className="flex items-center gap-2">
                <TbSearch />
                Cari
              </div>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default StockFilter;
