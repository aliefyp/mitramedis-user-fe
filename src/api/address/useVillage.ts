import useFetcher from "hooks/useFetcher";

const useVillage = ({ districtCode }: { districtCode: number }) => {
  return useFetcher({
    queryKey: "city",
    withAuth: true,
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/teritory/village?district_code=${districtCode}`,
    skip: !districtCode,
  });
}

export default useVillage;