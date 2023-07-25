import axios from "axios";
import { useMutation } from "react-query";
import { headers } from "constants/api";
import { LoginParam, LoginResponse } from "types/login";

const login = async (param: LoginParam): Promise<LoginResponse> => {
  const { data } = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_ENDPOINT}/login`,
    headers,
    data: JSON.stringify(param)
  });

  return data;
};

function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login);
  return { isLoggingIn: isLoading, login: mutateAsync };
}

export default useLogin;