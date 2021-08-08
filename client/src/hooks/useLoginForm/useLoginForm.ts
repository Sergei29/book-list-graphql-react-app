import React, { useState, useCallback, useContext } from "react";
import { Base64 } from "js-base64";
import { useMutation } from "@apollo/client";
import { objAuthContext } from "../../containers/AuthProvider";
import { SIGN_IN } from "../../graphql/mutations";
import { UserType } from "../../types";

type SignInPaloadType = { signIn: { user: UserType } };
type FormStateType = {
  email: string;
  password: string;
};

/**
 * @description custom hook, login form handling
 * @param {Function} onLoginSuccess callback on login success
 * @returns {Object} object with form handlers and submit error status
 */
const useLoginForm = (onLoginSuccess: () => void) => {
  const [objFormData, setObjFormData] = useState<FormStateType>({
    email: "",
    password: "",
  });
  const [nstrSignInError, setnstrSignInError] = useState<null | string>(null);
  const [bShowPassword, setbShowPassword] = useState<boolean>(false);

  const { setObjAuthInfo } = useContext(objAuthContext);

  const [funcSignInMutation] = useMutation<SignInPaloadType>(SIGN_IN);

  /**
   * @description on input change callback
   * @param {Object} objEvent input change event object
   * @returns {undefined} sets state
   */
  const handleChange = (
    objEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = objEvent.target;
    setObjFormData((objPrevState) => ({
      ...objPrevState,
      [name]: value.trim(),
    }));
  };

  /**
   * @description reset all fields
   * @returns {undefined} sets state
   */
  const handleReset = () => setObjFormData({ email: "", password: "" });

  /**
   * @description on form submit callback
   * @param {Object} objEvent form event object
   * @returns {undefined} sets state
   */
  const handleSubmit = async (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    const { email, password } = objFormData;
    if (!email.length || !password.length) return;
    const strEncodedPassword = Base64.encode(password);

    try {
      await funcSignInMutation({
        variables: { email, password: strEncodedPassword },
        update: (_, { data }) => {
          const nObjUserData = data?.signIn.user || null;
          if (nObjUserData) {
            setObjAuthInfo({ nObjUserData });
            onLoginSuccess();
          }
        },
      });
      setnstrSignInError(null);
    } catch (error) {
      setnstrSignInError(error.message);
    }
  };

  /**
   * @description show/hide pw value
   * @returns {undefined} sets tate
   */
  const handleToggleShowPassword = useCallback(() => {
    setbShowPassword((bPrevShow) => !bPrevShow);
  }, []);

  return {
    bShowPassword,
    handleToggleShowPassword,
    nstrSignInError,
    handleChange,
    handleReset,
    handleSubmit,
    objFormData,
  };
};

export default useLoginForm;
