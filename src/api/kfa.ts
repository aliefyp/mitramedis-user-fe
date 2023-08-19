import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { useState } from "react";
import { KfaType } from "types/kfa";

interface GetAllKfaResponse extends AxiosResponse {
  data: {
    result: KfaType[];
  }
}

export const useKfa = ({ keyword }) => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    ...useQuery<unknown, unknown, GetAllKfaResponse>({
      queryKey: ['get-all-kfa', keyword],
      queryFn: async () => {
        const query = new URLSearchParams({
          keyword,
        });

        try {
          return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/kfa/search?${query}`, { headers })
        } catch (err) {
          console.error(err);
          if (err?.response?.status === 401) signOut();
        }
      },
      enabled: Boolean(keyword?.length)
    }),
  }
}