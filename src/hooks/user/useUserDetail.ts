import axios from "axios";
import { useQuery } from "react-query";
import { UserParam, UserResponse } from "types/user";

const getUserDetail = async ({ userId, clinicId, token}: UserParam): Promise<UserResponse> => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/${userId}`, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'User-ID': userId,
    'Clinic-ID': clinicId,
  }});
  return data;
};

function useUserDetail({ userId, clinicId, token }: UserParam) {
  return useQuery("user", () => getUserDetail({ userId, clinicId, token }));
}

export default useUserDetail;