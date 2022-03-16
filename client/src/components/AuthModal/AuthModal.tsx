import React from "react";
import { Backdrop, Fade, Dialog, DialogContent } from "@material-ui/core";
// styles:
import { useStyles } from "./style";

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
  bOpen: boolean;
};

/**
 * @description authentication modal
 * @param {Boolean} {bOpen is modal open
 * @param {Node} children nested children - content
 * @param {Function} handleClose function to close modal }
 * @returns {JSX} modal HOC
 */
const AuthModal: React.FC<Props> = ({ bOpen, children, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="authentication-modal"
      aria-describedby="login or register the user"
      data-testid="authentication-modal"
      open={bOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      classes={{ paper: classes.modal }}
    >
      <Fade in={bOpen}>
        <DialogContent className={classes.modal__content}>
          {children}
        </DialogContent>
      </Fade>
    </Dialog>
  );
};

export default AuthModal;
