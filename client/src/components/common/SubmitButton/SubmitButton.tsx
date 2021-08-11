import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { useStyles } from "./style";

/**
 * @description common component, submit button
 * @param {Node} {children
 * @param {Object} restButtonProps MUI Button props
 * @returns {JSX} component markup
 */
const SubmitButton: React.FC<ButtonProps> = ({
  children,
  ...restButtonProps
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      type="submit"
      color="secondary"
      className={classes.submitButton}
      {...restButtonProps}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
