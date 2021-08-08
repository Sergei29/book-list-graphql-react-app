import React, { useState, createContext } from "react";
import { UserType, Role } from "../../types";

const objInitialContext: Readonly<AuthContextType> = {
  objAuthInfo: { nObjUserData: null },
  setObjAuthInfo: () => {},
  getIsAuthenticated: () => false,
  getIsAdmin: () => false,
};

type AuthStateType = {
  nObjUserData: UserType | null;
};

type AuthContextType = {
  objAuthInfo: AuthStateType;
  setObjAuthInfo: React.Dispatch<React.SetStateAction<AuthStateType>>;
  getIsAuthenticated: () => boolean;
  getIsAdmin: () => boolean;
};

/**
 * @description authenticaton context bearing current user info and user info setter function and getter functions for auth status and admin status
 */
export const objAuthContext = createContext<AuthContextType>(objInitialContext);

const { Provider } = objAuthContext;

/**
 * @description Auth info provider for the application
 * @param {Node} children nested children components
 * @returns {JSX} children components with provided context
 */
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
