import React from "react";
import { Typography, Chip } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import { useConfirmLink } from "../../hooks/useConfirmLink/useConfirmLink";

const EmailConfirmedPage: React.FC = () => {
  const {
    params: { strUserId },
  } = useRouteMatch<{ strUserId: string }>();
  const { bLoading, nObjUserInfo, nstrConfirmError } = useConfirmLink({
    strUserId,
  });

  const strErrorMessage = `Sorry, it looks like an error has occured while verifying your email. ${
    nstrConfirmError || ""
  }`;

  return (
    <div>
      {!bLoading && !nstrConfirmError && nObjUserInfo?.active ? (
        <Typography>
          {`Thank you, your email `}
          <Chip label={nObjUserInfo!.email} color="secondary" />
          {` has been verified.`}
        </Typography>
      ) : (
        <Typography>{strErrorMessage}</Typography>
      )}
    </div>
  );
};

export default EmailConfirmedPage;
