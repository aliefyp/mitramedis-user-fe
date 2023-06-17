import useLogin from "hooks/auth/useLogin";
import useLogout from "hooks/auth/useLogout";
import React, { createContext, useContext, useState } from "react";
import { LoginParam, LoginResponse } from "types/login";
// import { useLogin, useLogout, useUserInfo } from "../hooks/useAuth";
import { UserType } from "../types/user";

interface AuthContextInterface {
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (param: LoginParam) => Promise<any>;
  logout: () => Promise<any>;
  // userInfo?: UserType;
}

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoggingIn, login } = useLogin();
  const { isLoggingOut, logout } = useLogout();
  // const { data } = useUserInfo(authKey);

  const handleLogin = async ({ email, password }: LoginParam) => {
    return login({ email, password })
      .then((res: LoginResponse) => {
        if (res.success) {
          sessionStorage.setItem(`${process.env.REACT_APP_SESSION_PREFIX}${res.data.user_id}`, res.data.access_token);
        }
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = async () => {
    return logout()
      .then((data) => {
        // setAuthKey("");
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggingIn,
        isLoggingOut,
        login: handleLogin,
        logout: handleLogout,
        // userInfo: data
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;