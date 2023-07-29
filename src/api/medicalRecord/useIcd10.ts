import useFetcher from "hooks/useFetcher";

function useIcd10() {
  return useFetcher({
    queryKey: "icd10",
    withAuth: true,
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/icd/10`,
  });
}

export default useIcd10;