import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { VillageResponse } from "types/teritory";
import useFetcher from "hooks/useFetcher";

type GetVillageResponse = AxiosResponse & VillageResponse;

const useVillage = ({ districtCode }: { districtCode: string }) => {
  const fetch = useFetcher(`${process.env.REACT_APP_API_ENDPOINT}/teritory/village?district_code=${districtCode}`);

  return useQuery<unknown, Error, GetVillageResponse>({
    queryKey: ['get-village', districtCode],
    queryFn: fetch,
  })
}

export default useVillage;
