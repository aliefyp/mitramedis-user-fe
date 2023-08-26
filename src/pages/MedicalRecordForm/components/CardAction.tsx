import { Table, TextInput } from "flowbite-react";
import { Controller } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import ButtonAddMore from "components/ButtonAddMore";
import ComboBox2 from "components/FormInput/ComboBox2";
import Card from "components/Card";
import EmptyData from "components/EmptyData";
import IconButton from "components/IconButton";
import { useIcd9cm } from "api/icd9cm";
import { useMemo, useState } from "react";

const CardAction = ({ register, errors, control, fields, append, remove }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isFetching } = useIcd9cm();

  const displayedIcdList = useMemo(() => {
    const icdList = data?.data?.data?.icd9cm;

    if (!icdList?.length) return [];

    const copyIcd = [...icdList];
    const filtered =
      searchQuery === ""
        ? copyIcd
        : copyIcd.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchQuery.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered.splice(0, 10 * page);
  }, [data, page, searchQuery]);

  return (
    <Card className="min-w-lg rounded-xl border">
      <Table className="w-full">
        <Table.Head className="divide-x">
          <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Nama Tindakan
          </Table.HeadCell>
          <Table.HeadCell className="text-md w-[240px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Jumlah
          </Table.HeadCell>
          <Table.HeadCell className="text-md w-[240px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Harga Total
          </Table.HeadCell>
          <Table.HeadCell className="text-md w-[64px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
        </Table.Head>
        <Table.Body className="divide-y">
          {fields.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={4}>
                <EmptyData>Belum ada tindakan</EmptyData>
              </Table.Cell>
            </Table.Row>
          )}
          {fields.map((item, index) => (
            <Table.Row
              key={item.id}
              className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <Table.Cell>
                <Controller
                  control={control}
                  name={`actions.${index}.icd9cm`}
                  rules={{
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <ComboBox2
                      loading={isFetching}
                      placeholder="Cari tindakan disini"
                      options={displayedIcdList}
                      query={searchQuery}
                      value={value}
                      setQuery={setSearchQuery}
                      onChange={onChange}
                      color={Boolean(errors?.icd_code) ? "failure" : "gray"}
                      helperText={errors?.icd_code?.message}
                      onLoadMore={() => setPage(page + 1)}
                    />
                  )}
                />
              </Table.Cell>
              <Table.Cell className="w-[15%]">
                <TextInput
                  type="number"
                  defaultValue="1"
                  {...register(`actions.${index}.quantity`)}
                />
              </Table.Cell>
              <Table.Cell className="w-[20%]">
                <TextInput
                  type="number"
                  defaultValue="0"
                  step={1000}
                  {...register(`actions.${index}.price`)}
                />
              </Table.Cell>
              <Table.Cell className="w-[64px]">
                <IconButton onClick={() => remove(index)}>
                  <FaTrashAlt className="cursor-pointer text-gray-500" />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="p-4 pt-2">
        <ButtonAddMore
          onClick={() => append({ icd9cm: "", price: "1000", quantity: "1" })}
        >
          Tambah Tindakan
        </ButtonAddMore>
      </div>
    </Card>
  );
};

export default CardAction;
