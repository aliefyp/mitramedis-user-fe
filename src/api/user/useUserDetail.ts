import useFetcher from "hooks/useFetcher";
import { UserParam } from "types/user";

function useUserDetail({ userId }: UserParam) {
  return useFetcher({
    queryKey: "user",
    withAuth: true,
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/user/${userId}`,
  });
}

export default useUserDetail;