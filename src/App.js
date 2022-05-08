import React, { useEffect } from "react";
import { useHistory, Route, Routes, useLocation, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./util/firebase";
import { UserIcon, HomeIcon } from "@heroicons/react/outline";

//components
import Modal from "./component/modal/modal.component";
import AuthRoute from "./util/authRoute";

//pages
import HomePage from "./pages/home.page";
import AppPage from "./pages/app.page";
import SignUpPage from "./pages/signUp.page";
import AccountPage from "./pages/account.page";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/auth/auth.selector";
import { fetchUserDocStartAsync } from "./redux/auth/auth.actions";
import { toggelModalOpen } from "./redux/ui/ui.actions";

function App({ fetchUserDocStartAsync, currentUser, toggelModalOpen }) {
  auth.languageCode = "de";

  const { pathname } = useLocation();
  console.log(pathname);

  // useEffect(() => {
  //   if (currentUser && currentUser.userstate == 1) {
  //     toggelModalOpen({ control: "finishInitalSetup" });
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onIdTokenChanged(async (userAuth) => {
      await fetchUserDocStartAsync();
    });
    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <>
      <ToastContainer position="bottom-left" />
      <Modal />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/app/:id"
          element={
            <AuthRoute>
              <AppPage />
            </AuthRoute>
          }
        />
        <Route
          path="/app/user"
          element={
            <AuthRoute>
              <AccountPage />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserDocStartAsync: (values) => dispatch(fetchUserDocStartAsync(values)),
  toggelModalOpen: (values) => dispatch(toggelModalOpen(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
