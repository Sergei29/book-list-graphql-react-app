import React, { useState, createContext } from "react";
import { Role } from "../../types";

type AuthStateType = {
  nObjUserData: { email?: string; id?: string; role?: Role } | null;
};

type AuthContextType = {
  objAuthInfo: AuthStateType;
  setObjAuthInfo: React.Dispatch<React.SetStateAction<AuthStateType>>;
  getIsAuthenticated: () => boolean;
  getIsAdmin: () => boolean;
};

export const objAuthContext = createContext<AuthContextType>({
  objAuthInfo: { nObjUserData: null },
  setObjAuthInfo: () => {},
  getIsAuthenticated: () => false,
  getIsAdmin: () => false,
});

const { Provider } = objAuthContext;

export const AuthProvider: React.FC = ({ children }) => {
  const [objAuthInfo, setObjAuthInfo] = useState<AuthStateType>({
    nObjUserData: null,
  });

  const getIsAuthenticated = () => !!objAuthInfo.nObjUserData;

  const getIsAdmin = () =>
    objAuthInfo.nObjUserData !== null &&
    objAuthInfo.nObjUserData.role === Role.ADMIN;

  return (
    <Provider
      value={{ objAuthInfo, setObjAuthInfo, getIsAuthenticated, getIsAdmin }}
    >
      {children}
    </Provider>
  );
};
