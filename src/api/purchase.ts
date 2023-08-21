import axios from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { PurchaseType } from "types/purchase";

export const usePurchase = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async (payload: PurchaseType) => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/purchase`, JSON.stringify(payload), { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}