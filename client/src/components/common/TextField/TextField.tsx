import React, { Fragment } from "react";
import Classnames from "classnames";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ValidationType } from "../../../types";
import { useStyles } from "./style";

type Props = {
  handleChange: (strFieldName: string, strValue: string) => void;
  handleBlur?: (strFieldName: string, strValue: string) => void;
  objValidation?: ValidationType;
  strFieldname: string;
  strValue: string;
  strCustomClass?: string;
} & TextFieldProps;

/**
 * @description common component, textfield input
 * @param {Function} handleChange handler change field value on input
 * @param {Function} handleBlur handler to run on blur
 * @param {Object} objValidation field validation state
 * @param {String} strFieldname field name
 * @param {String} strCustomClass custom class
 * @param {Object} restMuiTextFieldProps MUI TextField props
 * @returns {JSX} component markup
 */
const TextField: React.FC<Props> = ({
  handleChange,
  handleBlur = () => {},
  objValidation = { bIsValid: true, strErrorMessage: "" },
  strFieldname,
  strValue,
  strCustomClass = "",
  ...restMuiTextFieldProps
}) => {
  const classes = useStyles();

  /**
   * @description input field change handler
   * @param {Object} objEvent change event object
   * @returns { undefined } sets state
   */
  const onInputChange = (
    objEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = objEvent.target;
    handleChange(name, value);
  };

  /**
   * @description input field blur handler
   * @param {Object} objEvent focus event object
   * @returns { undefined } sets state
   */
  const onInputBlur = (
    objEvent: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = objEvent.target;
    handleBlur(name, value);
  };

  return (
    <Fragment>
      <MuiTextField
        className={Classnames(classes.inputText, strCustomClass)}
        error={!objValidation.bIsValid}
        name={strFieldname}
        value={strValue}
        variant="outlined"
        onChange={onInputChange}
        onBlur={onInputBlur}
        {...restMuiTextFieldProps}
      />
      {!objValidation.bIsValid && (
        <FormHelperText className={classes.errorMessage}>
          {objValidation.strErrorMessage}
        </FormHelperText>
      )}
    </Fragment>
  );
};

export default TextField;
