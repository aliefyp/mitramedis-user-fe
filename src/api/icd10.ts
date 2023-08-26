import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { Icd10Response } from "types/icd10";

interface GetIcd10Response extends AxiosResponse {
  data: Icd10Response
}

export const useIcd10 = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useQuery<unknown, unknown, GetIcd10Response>({
    queryKey: ['get-all-icd10'],
    queryFn: async () => {
      try {
        return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/icd/10`, { headers })
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) signOut();
      }
    },
  })
}