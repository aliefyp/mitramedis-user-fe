import axios from "axios";
import { useMutation } from "react-query";
import { UserResponse } from "types/user";

const getUserDetail = async ({ userId, clinicId, token}: { userId: string, clinicId: string, token: string }): Promise<UserResponse> => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/${userId}`, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'User-ID': userId,
    'Clinic-ID': clinicId,
  }});
  return data;
};

function useUserDetail() {
  const { isLoading, mutateAsync } = useMutation(getUserDetail);
  return { isLoading, getUserDetail: mutateAsync };
}

export default useUserDetail;