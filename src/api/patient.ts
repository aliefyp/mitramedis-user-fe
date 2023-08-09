import axios from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation } from "react-query"
import { PatientType } from "types/patient"
import useAuthHeaders from "hooks/useAuthHeaders";

type Response = {
  data: {
    patient_id: number;
  }
}

export const useAddPatient = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation<Response, unknown, PatientType>(async payload => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/patient`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        }
      });
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 401)
        signOut();
    }
  })
}