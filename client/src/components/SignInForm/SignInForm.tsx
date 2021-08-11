import React, { Fragment } from "react";
import { FormControl, Button, Box, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "../common/TextField";
import ShowPasswordButton from "../common/ShowPasswordButton";
import useLoginForm from "../../hooks/useLoginForm";
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
const SignInForm: React.FC<Props> = ({ funcCloseModal, setBSignUp }) => {
  const classes = useStyles();

  const {
    bShowPassword,
    handleToggleShowPassword,
    nstrSignInError,
    handleChange,
    handleReset,
    handleSubmit,
    objFormData,
  } = useLoginForm(funcCloseModal);

  return (
    <Fragment>
      <Typography variant="h5" component="h3" className={classes.authHeading}>
        Sign In
      </Typography>
      <Typography className={classes.authHelperText}>
        Not registered ?
        <Button
          endIcon={<ExitToAppIcon />}
          onClick={() => setBSignUp(true)}
          className={classes.authHelperText__button}
        >
          Sign Up
        </Button>
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={classes.authForm}
      >
        {nstrSignInError && (
          <Typography className={classes.authForm__error}>
            {nstrSignInError}
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
            InputProps={{
              endAdornment: (
                <ShowPasswordButton
                  bShowPassword={bShowPassword}
                  handleClick={handleToggleShowPassword}
                  bDisabled={objFormData.password.length === 0}
                />
              ),
            }}
          />
        </FormControl>
        <FormControl className={classes.authForm__buttons}>
          <Button variant="contained" type="submit" color="secondary">
            submit
          </Button>
          <Button
            variant="contained"
            type="reset"
            onClick={handleReset}
            color="primary"
          >
            reset
          </Button>
        </FormControl>
      </Box>
    </Fragment>
  );
};

export default SignInForm;
