import React from "react";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
// styles:
import { useStyles } from "./style";

type Props = {
  bDisplayCloud: boolean;
} & IconButtonProps;

/**
 * @description button to toggle layout grid vs word cloud
 * @param {Boolean} {bDisplayCloud should display as word cloud or not
 * @param {Object} restIconButtonProps MUI `IconButton` props
 * @returns {JSX} component markup
 */
const ChangeListLayoutButton: React.FC<Props> = ({
  bDisplayCloud,
  ...restIconButtonProps
}) => {
  const classes = useStyles();

  return (
    <IconButton {...restIconButtonProps} className={classes.iconButton}>
      <Tooltip title={`display as ${bDisplayCloud ? "grid" : "word-cloud"}`}>
        {bDisplayCloud ? <ViewCompactIcon /> : <CloudQueueIcon />}
      </Tooltip>
    </IconButton>
  );
};

export default ChangeListLayoutButton;
