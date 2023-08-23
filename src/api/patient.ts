import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import { PatientType, PatientTypeData } from "types/patient"
import useAuthHeaders from "hooks/useAuthHeaders";
import { useState } from "react";
import { useLocation } from "react-router-dom";

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

interface DeletePatientPayload {
  patient_id: string;
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

interface PatientDetailPayload {
  patient_id: string;
  skip?: boolean;
}
interface GetPatientDetailResponse extends AxiosResponse {
  data: {
    data: {
      patient: PatientTypeData;
    }
  }
}

export const usePatientDetail = ({ patient_id, skip = false }: PatientDetailPayload) => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useQuery<unknown, unknown, GetPatientDetailResponse>({
    queryKey: ['get-patient-detail', patient_id],
    queryFn: async () => {
      try {
        return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/patient/${patient_id}`, { headers })
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) signOut();
      }
    },
    enabled: !skip,
  })
};

interface GetAllPatientResponse extends AxiosResponse {
  data: {
    data: {
      patient: PatientTypeData[];
      pagination: {
        current_page: number;
        total_page: number;
      }
    }
  }
}

export const useAllPatient = () => {
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
    ...useQuery<unknown, unknown, GetAllPatientResponse>({
      queryKey: ['get-all-patient', filter],
      queryFn: async () => {
        const query = new URLSearchParams({
          page: String(page),
          per_page: String(perPage),
          ...filter,
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