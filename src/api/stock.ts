import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { StockType } from "types/stock";

interface GetAllStockResponse extends AxiosResponse {
  data: {
    data: {
      stock: StockType[];
      pagination: {
        current_page: number;
        total_page: number;
      }
    }
  }
}

export const useAddStock = () => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  return useMutation(async (payload: StockType) => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/stock`, JSON.stringify(payload), { headers });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) signOut();
    }
  })
}

export const useAllStock = () => {
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
    ...useQuery<unknown, unknown, GetAllStockResponse>({
      queryKey: ['get-all-stock', filter],
      queryFn: async () => {
        const query = new URLSearchParams({
          page: String(page),
          per_page: String(perPage),
          ...filter,
        });

        try {
          return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/stock?${query}`, { headers })
        } catch (err) {
          console.error(err);
          if (err?.response?.status === 401) signOut();
        }
      }
    }),
  }
}