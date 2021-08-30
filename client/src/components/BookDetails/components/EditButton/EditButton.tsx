import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";

type Props = {
  handleClick: () => void;
};

const EditButton: React.FC<Props> = ({ handleClick }) => (
  <IconButton onClick={handleClick}>
    <Tooltip title="Edit book">
      <EditIcon />
    </Tooltip>
  </IconButton>
);

export default EditButton;
