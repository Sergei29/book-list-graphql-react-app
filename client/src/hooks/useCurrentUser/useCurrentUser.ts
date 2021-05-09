import { useQuery, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router-dom";
import useAuthToken from "../useAuthToken/useAuthToken";
import { GET_CURRENT_USER } from "../../graphql/queries";
import { authStatusVar } from "../../ApolloProvider/ApolloProvider";
import { UserType } from "../../types/types";

/**
 * @description custom hook for current user
 * @returns {any}
 */
const useCurrentUser = () => {
  const { push } = useHistory();
  const { bLoggedIn } = useReactiveVar(authStatusVar);

  const { data, error, client } = useQuery<{ me: UserType }>(GET_CURRENT_USER, {
    onCompleted: () => {
      authStatusVar({ bLoggedIn: data?.me ? true : false });
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
    authStatusVar({ bLoggedIn: false });
    push("/");
  };

  return {
    bLoggedIn,
    handleLogout,
    strUsername: data?.me?.username,
  };
};

export default useCurrentUser;
