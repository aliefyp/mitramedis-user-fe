import axios, { RawAxiosRequestConfig } from "axios"
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";

interface UseFetcherProps extends RawAxiosRequestConfig {
  withAuth?: boolean;
  queryKey: string;
  skip?: boolean,
}

const useFetcher = ({ queryKey, withAuth = false, url, method, headers, skip = false, ...rest }: UseFetcherProps) => {
  const auth = useAuthUser();
  const signOut = useSignOut();

  const userId = auth()?.userId;
  const clinicId = auth()?.clinicId;
  const token = auth()?.token;

  const fetcher = async () => {
    const { data } = await axios({
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(withAuth ? {
          'Authorization': `Bearer ${token}`,
          'User-ID': userId,
          'Clinic-ID': clinicId,
        } : {}),
        ...headers,
      },
      ...rest,
    })

    return data;
  };

  return useQuery({
    queryKey,
    queryFn: () => fetcher()
      .catch(err => {
        console.error(err)
        if (err?.response?.status === 401 && withAuth) {
          signOut();
        }
      }),
    enabled: !skip,
  });
}

export default useFetcher;