import Table from "components/Table";
import TableHead from "components/TableHead";
import TableRow from "components/TableRow";
import TableCell from "components/TableCell";
import TableBody from "components/TableBody";
import toIDR from "helpers/toIDR";
import Typography from "components/Typography";

const DUMMY_ITEMS = [
  { name: "Barang 1", price: 10000, qty: 1 },
  { name: "Barang 2", price: 1000, qty: 4 },
  { name: "Barang 3", price: 5000, qty: 2 },
  { name: "Barang 4", price: 100000, qty: 1 },
];

const Step7Billing = () => {
  return (
    <div className="py-6">
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-1">
          <Typography className="text-sm text-gray-500">No. Invoice</Typography>
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
          <Typography className="text-sm text-gray-500">Nama Pasien</Typography>
          <Typography bold className="text-md text-slate-800">
            Risky Dwi Setiyawan
          </Typography>
        </div>
      </div>
      <div className="min-w-xl overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell head>Item</TableCell>
              <TableCell head>Harga</TableCell>
              <TableCell head>Status</TableCell>
              <TableCell head>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DUMMY_ITEMS.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{toIDR(item.price)}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{toIDR(item.price * item.qty)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Step7Billing;
