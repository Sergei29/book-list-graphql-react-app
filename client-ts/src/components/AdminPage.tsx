import React, { Component } from "react";
import compose from "lodash.flowright";
import {
  getBooksQuery,
  removeBookMutation,
  removeAuthorMutation,
  getAdminAuthorsQuery,
} from "../queries/queries";

const AdminPage = () => {
  return (
    <div>
      <p>admin page</p>
    </div>
  );
};

export default AdminPage;
