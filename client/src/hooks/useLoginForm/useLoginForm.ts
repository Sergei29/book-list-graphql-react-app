import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import useAuthToken from "../useAuthToken";
import { SIGN_IN } from "../../graphql/mutations";
import { GET_CURRENT_USER } from "../../graphql/queries";

type FormStateType = {
  username: string;
  password: string;
};

/**
 * @description custom hook, login form handling
 * @param {Function} onLoginSuccess callback on login success
 * @returns {Object} object with form handlers and submit error status
 */
const useLoginForm = (onLoginSuccess: () => void) => {
  const [objFormData, setObjFormData] = useState<FormStateType>({
    username: "",
    password: "",
  });
  const [nstrSignInError, setnstrSignInError] = useState<null | string>(null);

  const { funcSetAuthToken } = useAuthToken();

  const [funcSignInMutation, objSignInResponse] = useMutation(SIGN_IN);

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
  const handleReset = () => setObjFormData({ username: "", password: "" });

  /**
   * @description on form submit callback
   * @param {Object} objEvent form event object
   * @returns {undefined} sets state
   */
  const handleSubmit = async (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    const { username, password } = objFormData;
    if (!username.length || !password.length) return;
    try {
      await funcSignInMutation({
        variables: { username, password },
        update: (cache, { data: { login } }) => {
          const { token } = login || {};
          if (token) {
            funcSetAuthToken(token);
            onLoginSuccess();
          }
        },
        // refetchQueries: [{ query: GET_CURRENT_USER }],
      });
      setnstrSignInError(null);
    } catch (error) {
      setnstrSignInError(error.message);
    }
  };

  return { nstrSignInError, handleChange, handleReset, handleSubmit };
};

export default useLoginForm;
