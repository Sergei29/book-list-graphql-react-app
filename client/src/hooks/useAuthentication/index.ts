import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_INFO, SIGN_OUT } from "../../graphql/mutations";
import { objAuthContext } from "../../containers/AuthProvider";
import { UserType } from "../../types";

type UserInfoPayloadType = { userInfo: { user: UserType } };

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
  const navigate = useNavigate();
  const { setObjAuthInfo } = useContext(objAuthContext);

  const [getUserInfo, { loading: bLoadingUserInfo }] =
    useMutation<UserInfoPayloadType>(USER_INFO);

  const [handleSignOut, { loading: bSigningOut }] = useMutation(SIGN_OUT, {
    onCompleted: () => {
      setObjAuthInfo({ nObjUserData: null });
      navigate("/");
    },
  });

  /**
   * @description effect to run on app load/reload
   * @returns {undefined} fetches user info, sets auth context value
   */
  useEffect(() => {
    const handleSessionInit = async () => {
      try {
        const { data } = await getUserInfo();
        setObjAuthInfo({ nObjUserData: data!.userInfo.user || null });
      } catch (error: any) {
        console.log(`error session init: `, error.message);
      }
    };

    handleSessionInit();
  }, [getUserInfo, setObjAuthInfo]);

  return { bLoadingUserInfo, bSigningOut, handleSignOut };
};
