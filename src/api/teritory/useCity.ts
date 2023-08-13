import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { CityResponse } from "types/teritory";
import useFetcher from "hooks/useFetcher";

type GetCityResponse = AxiosResponse & CityResponse;

const useCity = ({ provinceCode }: { provinceCode: string }) => {
  const fetch = useFetcher(`${process.env.REACT_APP_API_ENDPOINT}/teritory/city?province_code=${provinceCode}`);

  return useQuery<unknown, Error, GetCityResponse>({
    queryKey: ['get-city', provinceCode],
    queryFn: fetch,
  })
}

export default useCity;
