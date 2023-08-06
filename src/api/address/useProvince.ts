import useFetcher from "hooks/useFetcher";

const useProvince = () => {
  return useFetcher({
    queryKey: "province",
    withAuth: true,
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/teritory/province`,
  });
}

export default useProvince;