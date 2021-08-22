import React, { Fragment } from "react";
import Classnames from "classnames";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ValidationType } from "../../../types";
import { useStyles } from "./style";

type Props = {
  handleChange: (
    strFieldName: string,
    objFileValue: InstanceType<typeof File>
  ) => void;
  handleBlur?: (
    strFieldName: string,
    objFileValue: InstanceType<typeof File>
  ) => void;
  objValidation?: ValidationType;
  strFieldName: string;
  objFileValue?: InstanceType<typeof File>;
  strCustomClass?: string;
} & TextFieldProps;

/**
 * @description common component, textfield input
 * @param {Function} handleChange handler change field value on input
 * @param {Function} handleBlur handler to run on blur
 * @param {Object} objValidation field validation state
 * @param {String} strFieldName field name
 * @param {String} objFileValue field value
 * @param {String} strCustomClass custom class
 * @param {Object} restMuiTextFieldProps MUI TextField props
 * @returns {JSX} component markup
 */
const FileInput: React.FC<Props> = ({
  handleChange,
  handleBlur,
  objValidation = { bIsValid: true, strErrorMessage: "" },
  strFieldName,
  objFileValue,
  strCustomClass,
  ...restMuiTextFieldProps
}) => {
  const classes = useStyles();

  /**
   * @description input field change handler
   * @param {Object} objEvent change event object
   * @returns { undefined } sets state
   */
  const onInputChange = (objEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (!objEvent.target.files) return;
    const objFile = objEvent.target.files[0];
    const strFieldName = objEvent.target.name;
    handleChange(strFieldName, objFile);
  };

  /**
   * @description input field blur handler
   * @param {Object} objEvent focus event object
   * @returns { undefined } sets state
   */
  const onInputBlur = (objEvent: React.FocusEvent<HTMLInputElement>) => {
    if (!objEvent.target.files || !handleBlur) return;
    const objFile = objEvent.target.files[0];
    const strFieldName = objEvent.target.name;
    handleBlur(strFieldName, objFile);
  };

  return (
    <Fragment>
      <MuiTextField
        type="file"
        className={Classnames(classes.inputText, strCustomClass)}
        error={!objValidation.bIsValid}
        name={strFieldName}
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

export default FileInput;
