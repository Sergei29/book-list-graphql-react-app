import React, { useState, useCallback } from "react";
import { Button, Typography } from "@material-ui/core";
//components:
import AuthModal from "../AuthModal";
import AuthForm from "../AuthForm";
// styles:
import { useStyles } from "./style";

/**
 * @description functional component, authentication link and modal
 * @returns {JSX} authentication markup
 */
const Authentication: React.FC = () => {
  const classes = useStyles();
  const [bOpenModal, setbOpenModal] = useState<boolean>(false);

  /**
   * @description operate modal to open
   * @returns {undefined} sets state
   */
  const funcnModalOpen = useCallback(() => setbOpenModal(true), []);

  /**
   * @description operate modal to close
   * @returns {undefined} sets state
   */
  const funcModalClose = useCallback(() => setbOpenModal(false), []);

  return (
    <div>
      <Button onClick={funcnModalOpen}>logIn</Button>
      <AuthModal bOpen={bOpenModal} handleClose={funcModalClose}>
        <Typography variant="h5" component="h3" className={classes.authHeading}>
          Authentication
        </Typography>
        <AuthForm funcCloseModal={funcModalClose} />
      </AuthModal>
    </div>
  );
};

export default Authentication;
