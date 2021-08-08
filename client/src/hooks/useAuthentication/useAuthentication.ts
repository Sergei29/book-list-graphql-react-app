import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_INFO, SIGN_OUT } from "../../graphql/mutations";
import { objAuthContext } from "../../containers/AuthProvider";
import { UserType } from "../../types";

type UserInfoPaloadType = { user: UserType };

type HookReturnType = {
  bLoadingUserInfo: boolean;
  bSigningOut: boolean;
  handleSignOut: () => Promise<any>;
};

/**
 * @description custom hook to set user info into app context
 * @returns {undefined} fetching user data and sets context value
 */
export const useAuthentication = (): HookReturnType => {
  const history = useHistory();
  const { setObjAuthInfo } = useContext(objAuthContext);

  const [getUserInfo, { loading: bLoadingUserInfo }] =
    useMutation<UserInfoPaloadType>(USER_INFO);

  const [handleSignOut, { loading: bSigningOut }] = useMutation(SIGN_OUT, {
    onCompleted: () => {
      setObjAuthInfo({ nObjUserData: null });
      history.push("/");
    },
  });

  useEffect(() => {
    const handleSessionInit = async () => {
      try {
        const { data } = await getUserInfo();
        setObjAuthInfo({ nObjUserData: data!.user || null });
      } catch (error) {
        console.log(`error session init: `, error.message);
      }
    };

    handleSessionInit();
  }, [getUserInfo, setObjAuthInfo]);

  return { bLoadingUserInfo, bSigningOut, handleSignOut };
};
