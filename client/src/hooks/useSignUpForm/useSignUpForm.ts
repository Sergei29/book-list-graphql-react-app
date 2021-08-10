import React, { useState, useEffect, useContext } from "react";
import { Base64 } from "js-base64";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutations";
import { objAuthContext } from "../../containers/AuthProvider";
import { UserType, ObjValidationType, SignUpFormStateType } from "../../types";
import { getIntitialValidation } from "../helpers/getIntitialValidation";
import {
  validateSignUpFormField,
  funcIsFormValid,
} from "../helpers/validateSignUpFields";

type SignUpPayloadType = { signUp: { user: UserType } };
type HookPropsType = {
  handleSubmitSuccess: () => void;
};
type HookReturnType = {
  bFormComplete: boolean;
  bShowConfirmPassword: boolean;
  bShowPassword: boolean;
  bSignUpLoading: boolean;
  handleBlur: (strFieldName: string, strFieldValue: string) => void;
  handleChange: (strFieldName: string, strValue: string) => void;
  handleResetForm: () => void;
  handleSubmit: (objEvent: React.FormEvent) => void;
  handleToggleConfirmPassword: () => void;
  handleTogglePassword: () => void;
  nstrSignUpError: string | null;
  objFieldsValidation: Record<string, ObjValidationType>;
  objFormData: SignUpFormStateType;
};

/**
 * @description generates initial form state
 * @returns {Object} initial form state
 */
const getIntitialFormState = (): Readonly<SignUpFormStateType> => ({
  email: "",
  password: "",
  confirm_password: "",
});

/**
 * @description generates initial validation state
 * @returns {Object} initial validation state
 */
const getIntitialValidationState = (): Readonly<
  Record<string, ObjValidationType>
> => ({
  email: getIntitialValidation(),
  password: getIntitialValidation(),
  confirm_password: getIntitialValidation(),
});

/**
 * @description custom hook for sign up form
 * @param {Function} {handleSubmitSuccess callback to invoke on submit success
 * @returns {Object} form state, validation and handler functions
 */
const useSignUpForm = ({
  handleSubmitSuccess,
}: HookPropsType): HookReturnType => {
  const [objFormData, setObjFormData] = useState<SignUpFormStateType>(
    getIntitialFormState()
  );
  const [objFieldsValidation, setObjFieldsValidation] = useState<
    Record<string, ObjValidationType>
  >(getIntitialValidationState());
  const [nstrSignUpError, setnstrSignUpError] = useState<null | string>(null);
  const [bShowPassword, setbShowPassword] = useState<boolean>(false);
  const [bShowConfirmPassword, setbShowConfirmPassword] =
    useState<boolean>(false);
  const [bFormComplete, setbFormComplete] = useState<boolean>(false);

  const [
    funcSignUpMutation,
    { loading: bSignUpLoading, error: signUpError, data: objSignUpData },
  ] = useMutation<SignUpPayloadType>(SIGN_UP, { errorPolicy: "all" });

  const { setObjAuthInfo } = useContext(objAuthContext);

  /**
   * @description toggle password visibility
   * @returns {undefined } sets state
   */
  const handleTogglePassword = () =>
    setbShowPassword((bPrevShow) => !bPrevShow);

  /**
   * @description toggle confirm password visibility
   * @returns {undefined } sets state
   */
  const handleToggleConfirmPassword = () =>
    setbShowConfirmPassword((bPrevShow) => !bPrevShow);

  /**
   * @description on input change callback
   * @param {String} strFieldName field name
   * @param {String} strValue field value
   * @returns {undefined} sets form state
   */
  const handleChange = (strFieldName: string, strValue: string) =>
    setObjFormData((objPrevState) => ({
      ...objPrevState,
      [strFieldName]: strValue.trim(),
    }));

  /**
   * @description on input on blur callback
   * @param {String} strFieldName field name
   * @param {String} strValue field value
   * @returns {undefined} sets validation state
   */
  const handleBlur = (strFieldName: string, strFieldValue: string) =>
    setObjFieldsValidation((prevState) => ({
      ...prevState,
      [strFieldName]: validateSignUpFormField(
        strFieldName,
        strFieldValue,
        objFormData.password
      ),
    }));

  /**
   * @description resets form state and validation to initital values
   * @returns {undefined} sets state
   */
  const handleResetForm = () => {
    setObjFormData(getIntitialFormState());
    setObjFieldsValidation(getIntitialValidationState());
  };

  /**
   * @description on form submit callback
   * @param {Object} objEvent form event object
   * @returns {undefined} sets state
   */
  const handleSubmit = (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    if (!bFormComplete) return;
    const { email, password } = objFormData;
    const strEncodedPassword = Base64.encode(password);
    funcSignUpMutation({
      variables: {
        email,
        password: strEncodedPassword,
      },
    });
  };

  /**
   * @description effect to run on signUp mutation data response
   * @returns {undefined} sets state
   */
  useEffect(() => {
    if (!objSignUpData || !objSignUpData?.signUp) return;
    setObjAuthInfo({ nObjUserData: objSignUpData.signUp.user || null });
    handleSubmitSuccess();
  }, [objSignUpData]);

  /**
   * @description effect to run on signUp mutation error response
   * @returns {undefined} sets state
   */
  useEffect(() => {
    const nStrErrorMessage = signUpError?.message || null;
    setnstrSignUpError(nStrErrorMessage);
  }, [signUpError]);

  /**
   * @description effect to run on form update - define overall form validation
   * @returns {undefined} sets state
   */
  useEffect(() => {
    const bFormValid = funcIsFormValid(objFormData, objFieldsValidation);
    setbFormComplete(bFormValid);
  }, [objFormData, objFieldsValidation]);

  return {
    bFormComplete,
    bShowConfirmPassword,
    bShowPassword,
    bSignUpLoading,
    handleBlur,
    handleChange,
    handleResetForm,
    handleSubmit,
    handleToggleConfirmPassword,
    handleTogglePassword,
    nstrSignUpError,
    objFieldsValidation,
    objFormData,
  };
};

export default useSignUpForm;
