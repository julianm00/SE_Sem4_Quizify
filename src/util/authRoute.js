import React from "react";
import { Route, Navigate } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/auth/auth.selector";
import { auth } from "./firebase";

const AuthRoute = ({ children, currentUser, ...rest }) => {
  if (!auth.currentUser) return <Navigate replace to="/" />;

  return children;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AuthRoute);
