import React from "react";
import { Typography, Chip } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import { useConfirmLink } from "../../hooks/useConfirmLink/useConfirmLink";
import PageBackground from "./components/PageBackground";
// styles:
import { useStyles } from "./style";

const EmailConfirmedPage: React.FC = () => {
  const classes = useStyles();
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
      <PageBackground />
      {!bLoading && !nstrConfirmError && nObjUserInfo?.active ? (
        <Typography className={classes.page__text}>
          {`Thank you, your email `}
          <Chip label={nObjUserInfo!.email} color="secondary" />
          {` has been verified.`}
        </Typography>
      ) : (
        <Typography className={classes.page__text}>
          {strErrorMessage}
        </Typography>
      )}
    </div>
  );
};

export default EmailConfirmedPage;
