import React from "react";
import { Typography } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";

const EmailConfirmedPage: React.FC = () => {
  const {
    params: { userId },
  } = useRouteMatch<{ userId: string }>();
  return (
    <div>
      <Typography>User: {userId}</Typography>
    </div>
  );
};

export default EmailConfirmedPage;
