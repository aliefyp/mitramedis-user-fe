import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import { PatientType } from "types/patient"
import useAuthHeaders from "hooks/useAuthHeaders";
import { useState } from "react";

interface DeletePatientPayload {
  patient_id: string;
}

interface GetAllPatientResponse extends AxiosResponse {
  data: {
    data: {
      patient: PatientType[];
    }
  }
}

export const useAddPatient = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async (payload: PatientType) => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/patient`, JSON.stringify(payload), { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}

export const useDeletePatient = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async ({ patient_id }: DeletePatientPayload) => {
    try {
      return await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/patient/${patient_id}`, { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}

export const useAllPatient = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    ...useQuery<unknown, unknown, GetAllPatientResponse>({
      queryKey: 'get-all-patient',
      queryFn: async () => {
        const query = new URLSearchParams({
          page: String(page),
          per_page: String(perPage),
        });

        try {
          return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/patient?${query}`, { headers })
        } catch (err) {
          console.error(err);
          if (err?.response?.status === 401) signOut();
        }
      }
    }),
  }
}