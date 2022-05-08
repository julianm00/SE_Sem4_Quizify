import React from "react";
import { auth } from "../../util/firebase";
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { signOut } from "../../redux/auth/auth.actions";
import { toggelModalClose } from "../../redux/ui/ui.actions";

const SignOut = ({
  signOut,
  children,
  toggelModalClose,

  ...rest
}) => {
  const doSignOut = async () => {
    //close any open modal
    toggelModalClose();
    await auth.signOut();
    signOut();
    // window.location.reload();
  };
  return (
    <Link to="/" onClick={() => doSignOut()} {...rest}>
      {children}
    </Link>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  toggelModalClose: () => dispatch(toggelModalClose()),
});

export default connect(null, mapDispatchToProps)(SignOut);
