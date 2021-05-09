import React from "react";
import {
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import ShowPasswordButton from "./components/ShowPasswordButton";
import useLoginForm from "../../hooks/useLoginForm";
// styles:
import { useStyles } from "./style";

type Props = {
  funcCloseModal: () => void;
};

/**
 * @description login form
 * @param {Object} props component props
 * @returns {JSX} markup, form with input fields and buttons
 */
const AuthForm: React.FC<Props> = ({ funcCloseModal }) => {
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
    <Box component="form" onSubmit={handleSubmit} className={classes.authForm}>
      {nstrSignInError && (
        <Typography className={classes.authForm__error}>
          {nstrSignInError}
        </Typography>
      )}
      <FormControl>
        <TextField
          type="text"
          name="username"
          label="Username"
          variant="outlined"
          onChange={handleChange}
          className={classes.authForm__input}
          value={objFormData.username}
        />
      </FormControl>
      <FormControl>
        <TextField
          type={bShowPassword ? "text" : "password"}
          name="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
          className={classes.authForm__input}
          InputProps={{
            endAdornment: (
              <ShowPasswordButton
                bShowPassword={bShowPassword}
                handleClick={handleToggleShowPassword}
                bDisabled={objFormData.password.length === 0}
              />
            ),
          }}
          value={objFormData.password}
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
  );
};

export default AuthForm;
