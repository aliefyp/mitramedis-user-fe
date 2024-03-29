import { useAuthUser } from "react-auth-kit";

const useAuthHeaders = () => {
  const auth = useAuthUser();

  const userId = auth()?.userId;
  const clinicId = auth()?.clinicId;
  const token = auth()?.token;

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'User-ID': userId,
    'Clinic-ID': clinicId,
  }
}

export default useAuthHeaders;
