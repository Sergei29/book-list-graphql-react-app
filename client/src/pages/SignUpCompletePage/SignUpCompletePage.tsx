import React, { useContext } from "react";
import { Typography, Chip } from "@material-ui/core";
import { objAuthContext } from "../../containers/AuthProvider";

const SignUpCompletePage: React.FC = () => {
  const { objAuthInfo } = useContext(objAuthContext);

  return (
    <div>
      <Typography variant="h3" component="h1">
        Congratulations, new User!
      </Typography>
      <Typography>
        {`An activation link has been sent to `}
        <Chip
          label={objAuthInfo.nObjUserData?.email || " a provided email address"}
          color="secondary"
        />
      </Typography>
      <Typography>
        Please, check you email and confirm by clicking the link provided. If
        you haven't received a confirmation email - try to check your spam
        folder.
      </Typography>
    </div>
  );
};

export default SignUpCompletePage;
