import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

type Props = {
  strTitle: string;
} & Record<string, any>;

/**
 * @description word cloud item
 * @param {String} strTitle item title
 * @param {Object} restTagCloudProps TagCloud inner props
 * @returns {JSX} component markup
 */
const CloudItem: React.FC<Props> = ({ strTitle, ...restTagCloudProps }) => (
  <div {...restTagCloudProps}>
    <Tooltip title={strTitle}>
      <span>{strTitle}</span>
    </Tooltip>
  </div>
);

export default CloudItem;
