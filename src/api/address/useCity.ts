import useFetcher from "hooks/useFetcher";

const useCity = ({ provinceCode }: { provinceCode?: number }) => {
  return useFetcher({
    queryKey: "city",
    withAuth: true,
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/teritory/city?province_code=${provinceCode}`,
    skip: !provinceCode,
  });
}

export default useCity;