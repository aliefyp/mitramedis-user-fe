import Button from "components/Button";
import DataDisplay from "components/DataDisplay";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import ModalHeader from "components/ModalHeader";
import Typography from "components/Typography";
import { Table } from "flowbite-react";
import moment from "moment";
import { AllFormType } from "../interface";

interface ConfirmationModalProps {
  data: AllFormType;
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ConfirmationModal = ({
  data,
  open,
  onClose,
  onContinue,
}: ConfirmationModalProps) => {
  const dataStep1 = data[1];
  const dataStep2 = data[2];
  const dataStep3 = data[3];
  const dataStep4 = data[4];
  const dataStep5 = data[5];
  const dataStep6 = data[6];

  const physicalNoteStep2 = Object.keys(dataStep2).filter((item) =>
    item.startsWith("note_")
  );

  const displayStep1 = [
    {
      key: "Keluhan Utama",
      value: dataStep1.main_complaint,
    },
    {
      key: "Riwayat Penyakit Sekarang",
      value: dataStep1.medical_history_recent,
    },
    {
      key: "Riwayat Penyakit Terdahulu",
      value: dataStep1.medical_history_past,
    },
    {
      key: "Riwayat Alergi",
      value: dataStep1.note_allergy_history,
    },
    {
      key: "Riwayat Pengobatan",
      value: dataStep1.note_medical_treatment_history,
    },
  ].filter((item) => Boolean(item.value));

  const displayStep2 = [
    {
      key: "Keadaan Umum",
      value: (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Tingkat Kesadaran
            </Typography>
            <Typography small>{dataStep2.senses_level}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Status Psikologi
            </Typography>
            <Typography small>{dataStep2.psychological_state}</Typography>
          </div>
          <div className="col-span-4 col-start-1">
            <Typography smaller className=" !text-gray-500">
              Tinggi
            </Typography>
            <Typography small>{`${dataStep2.height} cm`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Berat
            </Typography>
            <Typography small>{`${dataStep2.weight} kg`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              BMI
            </Typography>
            <Typography small>{dataStep2.bmi}</Typography>
          </div>
        </div>
      ),
    },
    {
      key: "Vital Sign",
      value: (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Sistole
            </Typography>
            <Typography
              small
            >{`${dataStep2.blood_pressure_sistole} mmHg`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Diastole
            </Typography>
            <Typography
              small
            >{`${dataStep2.blood_pressure_diastole} mmHg`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              SPO2
            </Typography>
            <Typography small>{`${dataStep2.spo2 || "-"} %`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Suhu
            </Typography>
            <Typography small>{`${dataStep2.temperature} °C`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Denyut
            </Typography>
            <Typography small>{`${dataStep2.pulse_rate} /menit`}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Nafas
            </Typography>
            <Typography
              small
            >{`${dataStep2.respiration_rate} /menit`}</Typography>
          </div>
        </div>
      ),
    },
    {
      key: "Catatan Kondisi Tubuh",
      value: (
        <ul className=" list-disc pl-4">
          {physicalNoteStep2.map((item) => (
            <li>{dataStep2[item]}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "Catatan Penunjang",
      value: dataStep2.support_note,
    },
  ].filter((item) => Boolean(item.value));

  const displayStep3 = [
    {
      key: "Diagnosis",
      value: (
        <ul className=" list-disc pl-4">
          {dataStep3.map((item) => (
            <li>{`${item.icd_code} - ${item.type}`}</li>
          ))}
        </ul>
      ),
    },
  ];

  const displayStep4 = [
    {
      key: "KIE",
      value: dataStep4.kie,
    },
    {
      key: "Tindakan",
      value: (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Tanggal
            </Typography>
            <Typography small>
              {moment(dataStep4.created_date).format("ddd, DD/MM/YYYY")}
            </Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Waktu
            </Typography>
            <Typography small>{dataStep4.created_time || "-"}</Typography>
          </div>
          <div className="col-span-4">
            <Typography smaller className=" !text-gray-500">
              Petugas
            </Typography>
            <Typography small>{dataStep4.officer_name || "-"}</Typography>
          </div>
          <div className="col-span-12">
            <Typography smaller className=" !text-gray-500">
              Tindakan
            </Typography>
            <Typography small>
              {dataStep4.actions
                .map((i) => `${i.name} x ${i.quantity}`)
                .join("\n")}
            </Typography>
          </div>
          <div className="col-span-12">
            <Typography smaller className=" !text-gray-500">
              BMHP
            </Typography>
            <Typography small>
              {dataStep4.bmhp
                .map((i) => `${i.name} x ${i.quantity}`)
                .join("\n")}
            </Typography>
          </div>
        </div>
      ),
    },
  ];

  const displayStep5 = [
    {
      key: "Obat Non Racikan",
      value: (
        <Table>
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
          </Table.Head>
          <Table.Row>
            {dataStep5
              .filter((item) => item.type !== "custom")
              .map((item, index) => (
                <>
                  {}
                  <Table.Cell key={index}>
                    {item.medicines.map((item, index) => (
                      <div key={index}>{`${item.name} x ${item.quantity}`}</div>
                    ))}
                  </Table.Cell>
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
                </>
              ))}
          </Table.Row>
        </Table>
      ),
    },
    {
      key: "Obat Racikan",
      value: (
        <Table>
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
          </Table.Head>
          <Table.Row>
            {dataStep5
              .filter((item) => item.type === "custom")
              .map((item, index) => (
                <>
                  {}
                  <Table.Cell key={index}>
                    {item.medicines.map((item, index) => (
                      <div key={index}>{`${item.name} x ${item.quantity}`}</div>
                    ))}
                  </Table.Cell>
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
                </>
              ))}
          </Table.Row>
        </Table>
      ),
    },
  ];

  const displayStep6 = [
    {
      key: "Status Pasien",
      value: dataStep6.status,
    },
  ];

  return (
    <Modal open={open} onClose={onClose} className="md:min-w-[700px]">
      <ModalHeader>Konfirmasi</ModalHeader>
      <ModalBody>
        <Typography className="mb-4 !text-gray-600">
          Periksa kembali data yang sudah Anda input. Pastikan semua data sudah
          benar.
        </Typography>
        <div className="max-h-[70vh] overflow-auto rounded-md bg-gray-50 p-3">
          <div className="mb-4 space-y-8">
            <div className="space-y-2">
              <Typography bold className="pl-2">
                1. Anamnesis
              </Typography>
              <DataDisplay
                className="rounded-md bg-gray-100 p-2"
                items={displayStep1}
              />
            </div>
            <div className="space-y-2">
              <Typography bold className="pl-2">
                2. Pemeriksaan Fisik
              </Typography>
              <DataDisplay
                className="rounded-md bg-gray-100 p-2"
                items={displayStep2}
              />
            </div>
            <div className="space-y-2">
              <Typography bold className="pl-2">
                3. Diagnosis
              </Typography>
              <DataDisplay
                className="rounded-md bg-gray-100 p-2"
                items={displayStep3}
              />
            </div>
            <div className="space-y-2">
              <Typography bold className="pl-2">
                4. KIE &amp; Tindakan
              </Typography>
              <DataDisplay
                className="rounded-md bg-gray-100 p-2"
                items={displayStep4}
              />
            </div>
            <div className="space-y-2">
              <Typography bold className="pl-2">
                5. Resep Obat
              </Typography>
              <DataDisplay
                className="rounded-md bg-gray-100 p-2"
                items={displayStep5}
              />
            </div>
            <div className="space-y-2">
              <Typography bold className="pl-2">
                6. Status
              </Typography>
              <DataDisplay
                className="rounded-sm bg-gray-100 p-2"
                items={displayStep6}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Kembali
        </Button>
        <Button color="primary" onClick={onContinue}>
          Simpan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
