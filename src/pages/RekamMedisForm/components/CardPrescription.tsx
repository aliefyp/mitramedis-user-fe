import Button from "components/Button";
import ButtonAddMore from "components/ButtonAddMore";
import Card from "components/Card";
import EmptyData from "components/EmptyData";
import { Table } from "flowbite-react";
import { PrescriptionType } from "./Step5Prescription";

interface CardPrescriptionProps {
  buttonWording: string;
  items: PrescriptionType[];
  onAdd?: () => void;
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
}

const CardPrescription = ({
  buttonWording,
  items,
  onAdd,
  onDelete,
  onEdit,
}: CardPrescriptionProps) => {
  return (
    <Card className="min-w-lg rounded-xl border">
      <Table className="w-full rounded-xl">
        <Table.Head className="divide-x">
          <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Nama
          </Table.HeadCell>
          <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Aturan Pakai
          </Table.HeadCell>
          <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Rute
          </Table.HeadCell>
          <Table.HeadCell className="text-md w-[80px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
        </Table.Head>
        <Table.Body className="divide-y">
          {items.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={4}>
                <EmptyData>Belum ada tindakan</EmptyData>
              </Table.Cell>
            </Table.Row>
          )}
          {items.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <Table.Cell>{`${item.medicine_name} x ${item.qty}`}</Table.Cell>
              <Table.Cell>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${item.frequency_count}x ${
                      item.frequency_unit
                    }<br />${item.time.join(", ")} ${
                      item.time_note
                    }<br />${item.span.join(", ")} ${item.span_note}`,
                  }}
                />
              </Table.Cell>
              <Table.Cell>{item.method}</Table.Cell>
              <Table.Cell className="flex w-[80px] flex-col gap-1">
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(index)}
                >
                  Hapus
                </Button>
                <Button
                  size="small"
                  color="warning"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="p-4 pt-2">
        <ButtonAddMore onClick={onAdd}>{buttonWording}</ButtonAddMore>
      </div>
    </Card>
  );
};

export default CardPrescription;
