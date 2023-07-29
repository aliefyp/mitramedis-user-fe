import axios from "axios";
import { useMutation } from "react-query";
import { headers } from "constants/api";

const logout = async (): Promise<string> => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/logout`, {}, { headers });
  return data;
};

function useLogout() {
  const { isLoading, mutateAsync } = useMutation(logout);
  return { isLoggingOut: isLoading, logout: mutateAsync };
}

export default useLogout;