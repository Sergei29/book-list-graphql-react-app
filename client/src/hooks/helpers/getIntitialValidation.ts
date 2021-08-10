import { ObjValidationType } from "../../types";

/**
 * @description generates initial validation state
 * @returns {Object} field validation state
 */
export const getIntitialValidation = (): Readonly<ObjValidationType> => ({
  bIsValid: true,
  strErrorMessage: "",
});
