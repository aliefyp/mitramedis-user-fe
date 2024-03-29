import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import { PatientType, PatientTypeData } from "types/patient"
import useAuthHeaders from "hooks/useAuthHeaders";

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


export const useEditPatient = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async ({ patient_id, ...payload }: PatientType) => {
    try {
      return await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/patient/${patient_id}`, JSON.stringify(payload), { headers });
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

export const useAllPatient = (query: string) => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useQuery<unknown, unknown, GetAllPatientResponse>({
    queryKey: ['get-all-patient', query],
    queryFn: async () => {
      try {
        return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/patient?${query}`, { headers })
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) signOut();
      }
    }
  })
}