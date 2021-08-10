import { ObjValidationType, SignUpFormStateType } from "../../types";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = (strEmail: string): ObjValidationType => {
  if (strEmail.length === 0) {
    return {
      bIsValid: false,
      strErrorMessage: "This field cannot be empty",
    };
  }

  const bIsValid = EMAIL_REGEX.test(strEmail);
  return {
    bIsValid,
    strErrorMessage: bIsValid ? "" : "Email address is not valid",
  };
};

const validatePassword = (strPassword: string): ObjValidationType => ({
  bIsValid: strPassword.length >= 8,
  strErrorMessage:
    strPassword.length >= 8 ? "" : "must be at least 8 characters long",
});

const validateConfirmPassword = (
  strPassword: string,
  strConfirmPassword: string
): ObjValidationType => ({
  bIsValid: strPassword === strConfirmPassword,
  strErrorMessage:
    strPassword === strConfirmPassword ? "" : "Passwords not matching",
});

export const validateSignUpFormField = (
  strFieldName: string,
  strFieldValue: string,
  strPassword: string
): ObjValidationType => {
  switch (strFieldName) {
    case "email":
      return validateEmail(strFieldValue);
    case "password":
      return validatePassword(strFieldValue);
    case "confirm_password":
      return validateConfirmPassword(strPassword, strFieldValue);
    default:
      return { bIsValid: true, strErrorMessage: "" };
  }
};

export const funcIsFormValid = (
  objFormData: SignUpFormStateType,
  objFormValidation: Record<string, ObjValidationType>
) =>
  Object.values(objFormValidation).reduce(
    (bFormValid, objCurrentValidation) =>
      bFormValid && objCurrentValidation.bIsValid,
    true
  ) &&
  Object.values(objFormData).reduce((bFieldNotEmpty, strCurrentValue) => {
    return bFieldNotEmpty && strCurrentValue.length !== 0;
  }, true);
