import { useEffect } from "react";
import { useSignOut } from "react-auth-kit";

const Logout = () => {
  const signOut = useSignOut();

  useEffect(() => {
    signOut();
  }, [signOut])

  return null;
}

export default Logout