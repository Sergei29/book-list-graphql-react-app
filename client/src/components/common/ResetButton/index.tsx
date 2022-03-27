import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { useStyles } from "./style";

/**
 * @description common component, reset button
 * @param {Node} children
 * @param {Object} restButtonProps MUI Button props
 * @returns {JSX} component markup
 */
const ResetButton: React.FC<ButtonProps> = ({
  children,
  ...restButtonProps
}) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.resetButton}
      variant="contained"
      type="reset"
      color="primary"
      {...restButtonProps}
    >
      {children}
    </Button>
  );
};

export default ResetButton;
