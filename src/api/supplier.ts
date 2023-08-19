import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { SupplierType } from "types/supplier";

interface GetAllSupplierResponse extends AxiosResponse {
  data: {
    data: {
      supplier: SupplierType[];
    }
  }
}

export const useAddSupplier = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async (payload: SupplierType) => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/supplier`, JSON.stringify(payload), { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}

export const useSupplier = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useQuery<unknown, unknown, GetAllSupplierResponse>({
    queryKey: ['get-all-supplier'],
    queryFn: async () => {
      try {
        return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/supplier`, { headers })
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) signOut();
      }
    },
  })
}