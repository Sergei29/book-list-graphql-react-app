import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Box,
  InputBase,
} from "@material-ui/core";
import { useSignInMutation } from "../../generated/graphql";
import useAuthToken from "../../hooks/useAuthToken";
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
  const [objFormData, setObjFormData] = useState<FormStateType>({
    username: "",
    password: "",
  });

  const { funcSetAuthToken } = useAuthToken();

  const [funcSignInMutation, objSignInResponse] = useSignInMutation({
    update: (cache, objSignInResponse) => {
      const { data } = objSignInResponse;
      console.log("data :>> ", data);
      const { token } = data?.login || {};
      if (token) {
        funcSetAuthToken(token);
        funcCloseModal();
      }
    },
  });

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

  const handleReset = () => setObjFormData({ username: "", password: "" });

  /**
   * @description on form submit callback
   * @param {Object} objEvent form event object
   * @returns {undefined} sets state
   */
  const handleSubmit = (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    const { username, password } = objFormData;
    if (!username.length || !password.length) return;

    funcSignInMutation({ variables: { username, password } });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.authForm}>
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
