import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { UserResponse, UserParam } from "types/user";
import useFetcher from "hooks/useFetcher";

type GetUserResponse = AxiosResponse & UserResponse;

const useUserDetail = ({ userId }: UserParam) => {
  const fetch = useFetcher(`${process.env.REACT_APP_API_ENDPOINT}/user/${userId}`);

  return useQuery<unknown, Error, GetUserResponse>({
    queryKey: 'get-user-detail',
    queryFn: fetch,
  })
}

export default useUserDetail;