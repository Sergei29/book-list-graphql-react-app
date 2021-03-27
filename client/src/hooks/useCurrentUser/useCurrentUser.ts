import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuthToken from "../useAuthToken/useAuthToken";
import { useGetCurrentUserQuery } from "../../generated/graphql";

/**
 * @description custom hook for current user
 * @returns {any}
 */
const useCurrentUser = () => {
  const { push } = useHistory();
  const [bLoggedIn, setbLoggedIn] = useState<boolean>(false);

  const { data: objLoginData, error, client } = useGetCurrentUserQuery({
    onCompleted: () => {
      setbLoggedIn(() => (objLoginData?.me ? true : false));
    },
  });
  const { funcRemoveAuthToken } = useAuthToken();

  /**
   * @description user logout handler
   * @returns {undefined} reset store, remove auth cookie
   */
  const handleLogout = async () => {
    funcRemoveAuthToken();
    await client.resetStore();
    setbLoggedIn(false);
    push("/");
  };

  return {
    bLoggedIn,
    handleLogout,
    strUsername: objLoginData?.me?.username,
  };
};

export default useCurrentUser;
