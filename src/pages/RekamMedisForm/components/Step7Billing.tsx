import toIDR from "helpers/toIDR";
import Typography from "components/Typography";
import { Table } from "flowbite-react";

const DUMMY_ITEMS_OBAT = [
  { name: "Obat 1", price: 10000, qty: 1 },
  { name: "Obat 2", price: 1000, qty: 4 },
];
const DUMMY_ITEMS_TINDAKAN = [
  { name: "Barang 1", price: 10000, qty: 1 },
  { name: "Barang 2", price: 1000, qty: 4 },
];
const DUMMY_ITEMS_LAYANAN = [
  { name: "Barang 1", price: 10000, qty: 1 },
  { name: "Barang 2", price: 1000, qty: 4 },
];

const Step7Billing = ({ show, navigation, onSubmit }) => {
  if (!show) return null;

  return (
    <>
      <div className="p-6">
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-1">
            <Typography className="text-sm text-gray-500">
              No. Invoice
            </Typography>
            <Typography bold className="text-md text-slate-800">
              #002121
            </Typography>
          </div>
          <div className="col-span-3 md:col-span-1">
            <Typography className="text-sm text-gray-500">Tanggal</Typography>
            <Typography bold className="text-md text-slate-800">
              1 Januari 2023
            </Typography>
          </div>
          <div className="col-span-3 md:col-span-1">
            <Typography className="text-sm text-gray-500">
              Nama Pasien
            </Typography>
            <Typography bold className="text-md text-slate-800">
              Risky Dwi Setiyawan
            </Typography>
          </div>
        </div>
        <div className="min-w-xl overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Item</Table.HeadCell>
              <Table.HeadCell>Harga</Table.HeadCell>
              <Table.HeadCell>Qty</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Typography bold>I. Obat</Typography>
                </Table.Cell>
              </Table.Row>
              {DUMMY_ITEMS_OBAT.map((item) => (
                <Table.Row key={item.name}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{toIDR(item.price)}</Table.Cell>
                  <Table.Cell>{item.qty}</Table.Cell>
                  <Table.Cell>{toIDR(item.price * item.qty)}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Typography bold>II. Tindakan</Typography>
                </Table.Cell>
              </Table.Row>
              {DUMMY_ITEMS_TINDAKAN.map((item) => (
                <Table.Row key={item.name}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{toIDR(item.price)}</Table.Cell>
                  <Table.Cell>{item.qty}</Table.Cell>
                  <Table.Cell>{toIDR(item.price * item.qty)}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Typography bold>III. Layanan</Typography>
                </Table.Cell>
              </Table.Row>
              {DUMMY_ITEMS_LAYANAN.map((item) => (
                <Table.Row key={item.name}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{toIDR(item.price)}</Table.Cell>
                  <Table.Cell>{item.qty}</Table.Cell>
                  <Table.Cell>{toIDR(item.price * item.qty)}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell colSpan={4}></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan={2} />
                <Table.Cell>
                  <Typography bold className="text-right">
                    Subtotal
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography>{toIDR(10000)}</Typography>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan={2} />
                <Table.Cell>
                  <Typography bold className="text-right">
                    Diskon
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography>{toIDR(1000)}</Typography>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan={2} />
                <Table.Cell className="border-t">
                  <Typography bold className="text-right">
                    Total
                  </Typography>
                </Table.Cell>
                <Table.Cell className="border-t">
                  <Typography>{toIDR(10000)}</Typography>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <form onSubmit={onSubmit}>{navigation}</form>
    </>
  );
};

export default Step7Billing;
