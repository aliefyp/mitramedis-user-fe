import axios from "axios";
import { useMutation } from "react-query";
import { headers } from "constants/api";
import { RegisterParam, RegisterResponse } from "types/register";

const register = async (param: RegisterParam): Promise<RegisterResponse> => {
  const { data } = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_ENDPOINT}/signup`,
    headers,
    data: JSON.stringify(param)
  });
  return data;
};

function useRegister() {
  const { isLoading, mutateAsync } = useMutation(register);
  return { isRegistering: isLoading, register: mutateAsync };
}

export default useRegister;