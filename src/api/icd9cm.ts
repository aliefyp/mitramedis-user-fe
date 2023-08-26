import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { Icd9cmResponse } from "types/icd9cm";

interface GetIcd9cmResponse extends AxiosResponse {
  data: Icd9cmResponse
}

export const useIcd9cm = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useQuery<unknown, unknown, GetIcd9cmResponse>({
    queryKey: ['get-all-icd9'],
    queryFn: async () => {
      try {
        return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/icd/9cm`, { headers })
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) signOut();
      }
    },
  })
}