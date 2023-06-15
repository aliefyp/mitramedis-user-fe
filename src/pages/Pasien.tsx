import { Button, Card, Pagination, Table, Tooltip } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import PageHeading from "components/PageHeading";
import SearchBar from "components/SearchBar";

const PATIENT_TABLE_ROW = ['No. Rekam Medis', 'Nama', 'Umur', 'NIK', 'Alamat', '']

const PATIENT_DATA = [
  {
    patient_id: 'MR1',
    name: 'Adit toor',
    age: '29 Tahun 1 Bulan 9 Hari',
    ktp: '128474839',
    address: 'Saradan',
  },
  {
    patient_id: 'MR5',
    name: 'ahmad suhadi	',
    age: '28 Tahun 1 Bulan 21 Hari',
    ktp: '3010071304950001',
    address: 'sidomekar, semboro, jember',
  },
  {
    patient_id: 'MR6',
    name: 'ahmad barun',
    age: '27 Tahun 10 Bulan 18 Hari',
    ktp: '3113071707950001',
    address: 'semboro, semboro, jember',
  }
]

const Pasien = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [value] = useDebounce(searchText, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.trim());
  }

  console.log(value)

  return (
    <div>
      <PageHeading title="Pasien" breadcrumbs={[{ text: 'Pasien' }]} />
      <Card className="border-none shadow-sm rounded-2xl">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full sm:w-1/3 mb-4">
            <SearchBar autoFocus id="search-pasien" placeholder="Masukkan MR, Nama, atau NIK" onChange={handleSearchChange} />
          </div>
          <div className="w-full sm:w-2/3 mb-4 flex items-center justify-end space-x-6">
            {/* <FaDownload size={20} className="text-slate-600 cursor-pointer" /> */}
            <Button size="md" className="w-full sm:w-auto !rounded-3xl">
              <div className="flex items-center gap-4">
                <FaPlus />
                <p className="font-bold text-xl">Pasien Baru</p>
              </div>
            </Button>
          </div>
        </div>
        <div className=" min-w-2xl overflow-auto">
          <Table>
            <Table.Head>
              {PATIENT_TABLE_ROW.map(item => (
                <Table.HeadCell className="bg-slate-100 text-md whitespace-nowrap uppercase text-slate-800 dark:text-white">{item}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {PATIENT_DATA.map(item => (
                <Table.Row className="bg-white dark:border-slate-700 dark:bg-slate-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-slate-800 dark:text-white">
                    {item.patient_id}
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.age}</Table.Cell>
                  <Table.Cell>{item.ktp}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <Tooltip content="Lihat">
                        <div className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center bg-slate-50 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700">
                          <FaEye className="text-lg text-cyan-600" />
                        </div>
                      </Tooltip>
                      <Tooltip content="Ubah">
                        <div className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center bg-slate-50 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700">
                          <FaPencilAlt className="text-lg text-cyan-600" />
                        </div>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
            totalPages={100}
          />
        </div>
      </Card>
    </div>
  )
}

export default Pasien;
