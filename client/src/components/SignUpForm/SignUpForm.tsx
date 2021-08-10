import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, Button, Box, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "../common/TextField";
import ShowPasswordButton from "../common/ShowPasswordButton";
import SubmitButton from "../common/SubmitButton";
import ResetButton from "../common/ResetButton";
import PageBackDrop from "../common/PageBackDrop";
import useSignUpForm from "../../hooks/useSignUpForm/useSignUpForm";
// styles:
import { useStyles } from "./style";

type Props = {
  funcCloseModal: () => void;
  setBSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * @description login form
 * @param {Object} props component props
 * @returns {JSX} markup, form with input fields and buttons
 */
const SignUpForm: React.FC<Props> = ({ funcCloseModal, setBSignUp }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    funcCloseModal();
    history.push("/verify-email");
  };

  const {
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
  } = useSignUpForm({ handleSubmitSuccess });

  if (bSignUpLoading) {
    return (
      <PageBackDrop>
        <span>Signing up...</span>
      </PageBackDrop>
    );
  }
  return (
    <Fragment>
      <Typography variant="h5" component="h3" className={classes.authHeading}>
        Sign Up
      </Typography>
      <Typography className={classes.authHelperText}>
        Already registered ?
        <Button
          endIcon={<ExitToAppIcon />}
          onClick={() => setBSignUp(false)}
          className={classes.authHelperText__button}
        >
          Log in
        </Button>
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={classes.authForm}
      >
        {nstrSignUpError && (
          <Typography className={classes.authForm__error}>
            {nstrSignUpError}
          </Typography>
        )}
        <FormControl>
          <TextField
            type="text"
            label="Email"
            variant="outlined"
            strFieldname="email"
            strValue={objFormData.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFieldsValidation.email}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            variant="outlined"
            type={bShowPassword ? "text" : "password"}
            strFieldname="password"
            strValue={objFormData.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFieldsValidation.password}
            required
            InputProps={{
              endAdornment: (
                <ShowPasswordButton
                  bShowPassword={bShowPassword}
                  handleClick={handleTogglePassword}
                  bDisabled={objFormData.password.length === 0}
                />
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={bShowConfirmPassword ? "text" : "password"}
            strFieldname="confirm_password"
            strValue={objFormData.confirm_password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFieldsValidation.confirm_password}
            required
            disabled={!objFieldsValidation.password.bIsValid}
            InputProps={{
              endAdornment: (
                <ShowPasswordButton
                  bShowPassword={bShowConfirmPassword}
                  handleClick={handleToggleConfirmPassword}
                  bDisabled={objFormData.confirm_password.length === 0}
                />
              ),
            }}
          />
        </FormControl>
        <FormControl className={classes.authForm__buttons}>
          <SubmitButton disabled={!bFormComplete}>submit</SubmitButton>
          <ResetButton onClick={handleResetForm}>reset</ResetButton>
        </FormControl>
      </Box>
    </Fragment>
  );
};

export default SignUpForm;
