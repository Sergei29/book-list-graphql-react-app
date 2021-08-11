import React from "react";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";

type Props = {
  bDisplayCloud: boolean;
} & IconButtonProps;

const ChangeListLayoutButton: React.FC<Props> = ({
  bDisplayCloud,
  ...restIconButtonProps
}) => {
  return (
    <IconButton {...restIconButtonProps}>
      <Tooltip title={`display ${bDisplayCloud ? "grid" : "cloud"} view`}>
        {bDisplayCloud ? <ViewCompactIcon /> : <CloudQueueIcon />}
      </Tooltip>
    </IconButton>
  );
};

export default ChangeListLayoutButton;
