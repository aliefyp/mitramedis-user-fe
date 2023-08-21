import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import { MedicalRecordType, MedicalRecordTypeData } from "types/medical-record"
import useAuthHeaders from "hooks/useAuthHeaders";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface DeleteMedicalRecordPayload {
  medical_record_id: string;
}

interface GetAllMedicalRecordResponse extends AxiosResponse {
  data: {
    data: {
      medical_record: MedicalRecordTypeData[];
      pagination: {
        current_page: number;
        total_page: number;
      }
    }
  }
}

export const useAddMedicalRecord = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async (payload: MedicalRecordType) => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/medicalrecord`, JSON.stringify(payload), { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}

export const useDeleteMedicalRecord = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async ({ medical_record_id }: DeleteMedicalRecordPayload) => {
    try {
      return await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/medicalrecord/${medical_record_id}`, { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}

export const useAllMedicalRecord = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const location = useLocation();
  const filter = Object.fromEntries(new URLSearchParams(location.search));

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    ...useQuery<unknown, unknown, GetAllMedicalRecordResponse>({
      queryKey: ['get-all-medical-record', filter],
      queryFn: async () => {
        const query = new URLSearchParams({
          page: String(page),
          per_page: String(perPage),
          ...filter,
        });

        try {
          return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/medicalrecord?${query}`, { headers })
        } catch (err) {
          console.error(err);
          if (err?.response?.status === 401) signOut();
        }
      }
    }),
  }
}