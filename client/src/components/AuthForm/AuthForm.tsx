import React from "react";
import {
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import useLoginForm from "../../hooks/useLoginForm";
import useCurrentUser from "../../hooks/useCurrentUser";
// styles:
import { useStyles } from "./style";

type FormStateType = {
  username: string;
  password: string;
};

type Props = {
  funcCloseModal: () => void;
};

const AuthForm: React.FC<Props> = ({ funcCloseModal }) => {
  const classes = useStyles();
  const {
    nstrSignInError,
    handleChange,
    handleReset,
    handleSubmit,
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
        />
      </FormControl>
      <FormControl>
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
          className={classes.authForm__input}
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
