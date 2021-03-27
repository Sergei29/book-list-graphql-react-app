import { useCallback } from "react";
import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

/**
 * @description custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
 * @returns {Object} token value and token handler functions
 */
const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

  /**
   * @description set token value in cookies
   * @param {String} strToken auth token value
   * @returns {undefined} sets cookie
   */
  const funcSetAuthToken = useCallback(
    (strToken: string) => setCookie(TOKEN_NAME, strToken),
    []
  );

  /**
   * @description remove token from cookies
   * @returns {undefined} sets cookie
   */
  const funcRemoveAuthToken = useCallback(() => removeCookie(TOKEN_NAME), []);

  return {
    strAuthToken: cookies[TOKEN_NAME],
    funcSetAuthToken,
    funcRemoveAuthToken,
  };
};

export default useAuthToken;
