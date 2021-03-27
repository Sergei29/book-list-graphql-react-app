import React, { useState, useCallback, useEffect } from "react";
import useAuthToken from "../useAuthToken";
import { useGetCurrentUserQuery } from "../../generated/graphql";

/**
 * @description custom hook for current user
 * @returns {any}
 */
const useCurrentUser = () => {
  const [bLoggedIn, setbLoggedIn] = useState<boolean>(false);

  const { data: objLoginData, error, client } = useGetCurrentUserQuery();
  const { funcRemoveAuthToken } = useAuthToken();

  /**
   * @description user logout handler
   * @returns {undefined} reset store, remove auth cookie
   */
  const handleLogout = () => {
    funcRemoveAuthToken();
    client.resetStore();
    setbLoggedIn(false);
  };

  useEffect(() => {
    setbLoggedIn(() => (objLoginData?.me ? true : false));
  }, [objLoginData]);

  return {
    bLoggedIn,
    handleLogout,
    strUsername: objLoginData?.me?.username,
  };
};

export default useCurrentUser;
