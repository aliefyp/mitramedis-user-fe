import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { Icd10Response } from "types/icd10";
import useFetcher from "hooks/useFetcher";

type GetIcd10Response = AxiosResponse & Icd10Response;

const useIcd10 = () => {
  const fetch = useFetcher(`${process.env.REACT_APP_API_ENDPOINT}/icd/10`);

  return useQuery<unknown, Error, GetIcd10Response>({
    queryKey: 'get-icd10',
    queryFn: fetch,
  })
}

export default useIcd10;