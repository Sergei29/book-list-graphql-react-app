import React, { useContext } from "react";
import { Typography, Chip } from "@material-ui/core";
import { objAuthContext } from "../../containers/AuthProvider";
import PageBackground from "./components/PageBackground";
// styles:
import { useStyles } from "./style";

const SignUpCompletePage: React.FC = () => {
  const classes = useStyles();
  const { objAuthInfo } = useContext(objAuthContext);

  return (
    <div>
      <PageBackground />
      <Typography variant="h3" component="h1" className={classes.page__text}>
        Congratulations, new User!
      </Typography>
      <Typography className={classes.page__text}>
        {`An activation link has been sent to `}
        <Chip
          label={objAuthInfo.nObjUserData?.email || " a provided email address"}
          color="secondary"
        />
      </Typography>
      <Typography className={classes.page__text}>
        Please, check you email and confirm by clicking the link provided. If
        you haven't received a confirmation email - try to check your spam
        folder.
      </Typography>
    </div>
  );
};

export default SignUpCompletePage;
