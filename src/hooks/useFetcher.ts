import axios, { RawAxiosRequestConfig } from "axios"
import { useSignOut } from "react-auth-kit";
import useAuthHeaders from "./useAuthHeaders";

const useFetcher = (url: string, config?: RawAxiosRequestConfig) => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return async () => {
    try {
      return await axios.get(url, { headers, ...config })
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  }
}

export default useFetcher;