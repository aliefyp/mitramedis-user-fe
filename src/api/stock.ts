import axios, { AxiosResponse } from "axios"
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query"
import useAuthHeaders from "hooks/useAuthHeaders";
import { useState } from "react";
import { StockCardType, StockType } from "types/stock";


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


type UseStockCardProps = {
  stock_id: string;
  filter?:  Record<string, string>
}

interface GetStockCardResponse extends AxiosResponse {
  data: {
    data: {
      stock_card: StockCardType[];
    }
  }
}
export const useStockCard = ({ filter, stock_id }: UseStockCardProps) => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);

  return {
    // page,
    // perPage,
    // setPage,
    // setPerPage,
    ...useQuery<unknown, unknown, GetStockCardResponse>({
      queryKey: ['get-all-stock', filter, stock_id],
      queryFn: async () => {
        const query = new URLSearchParams({
          // page: String(page),
          // per_page: String(perPage),
          ...filter,
        });

        try {
          return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/stock-card/${stock_id}?${query}`, { headers })
        } catch (err) {
          console.error(err);
          if (err?.response?.status === 401) signOut();
        }
      },
      enabled: Boolean(stock_id),
    }),
  }
}


type UseAllStockProps = {
  filter?:  Record<string, string>
}

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

export const useAllStock = (payload?: UseAllStockProps) => {
  const signOut = useSignOut();
  const headers = useAuthHeaders();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    ...useQuery<unknown, unknown, GetAllStockResponse>({
      queryKey: ['get-all-stock', payload?.filter],
      queryFn: async () => {
        const query = new URLSearchParams({
          page: String(page),
          per_page: String(perPage),
          ...payload?.filter,
        });

        try {
          return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/stock?${query}`, { headers })
        } catch (err) {
          console.error(err);
          if (err?.response?.status === 401) signOut();
        }
      },
    }),
  }
}