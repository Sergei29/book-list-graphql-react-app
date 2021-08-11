import { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_CONFIRM } from "../../graphql/mutations";
import { objAuthContext } from "../../containers/AuthProvider";
import { UserType } from "../../types";

type MutationResponseType = { signUpConfirm: { user: UserType } };

type HookPropsType = {
  strUserId: string;
};

type HookReturnType = {
  bLoading: boolean;
  nObjUserInfo: null | UserType;
  nstrConfirmError: string | null;
};

/**
 * @description custom hook confirm email by user's ID, fires confirm link mutation on mount
 * @param {String} strUserId user's ID received from confirmation link
 * @returns {Object} mutation status and outcome
 */
export const useConfirmLink = ({
  strUserId,
}: HookPropsType): HookReturnType => {
  const [nstrConfirmError, setnstrConfirmError] = useState<null | string>(null);
  const { setObjAuthInfo, objAuthInfo } = useContext(objAuthContext);
  const [funcConfirmLink, { loading: bLoading, error, data }] =
    useMutation<MutationResponseType>(SIGN_UP_CONFIRM, { errorPolicy: "all" });

  /**
   * @description effect to run on mount, fires mutaton to confirm link by ID
   * @returns {undefined}
   */
  useEffect(() => {
    if (!!strUserId === false) return;
    funcConfirmLink({ variables: { id: strUserId } });
  }, [strUserId]);

  /**
   * @description effect to run on error updates - mutation outcome
   * @returns {undefined} sets state
   */
  useEffect(() => {
    const nstrErrorMessage = error?.message || null;
    setnstrConfirmError(nstrErrorMessage);
  }, [error]);

  /**
   * @description effect to run on data updates - mutation outcome
   * @returns {undefined} sets state
   */
  useEffect(() => {
    if (!data || !data?.signUpConfirm) return;
    const { user } = data.signUpConfirm;
    setObjAuthInfo({ nObjUserData: user });
  }, [data]);

  return { bLoading, nObjUserInfo: objAuthInfo.nObjUserData, nstrConfirmError };
};
