import useFetcher from "hooks/useFetcher";

const useDisctrict = ({ cityCode }: { cityCode: number }) => {
  return useFetcher({
    queryKey: "district",
    withAuth: true,
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/teritory/district?city_code=${cityCode}`,
    skip: !cityCode,
  });
}

export default useDisctrict;