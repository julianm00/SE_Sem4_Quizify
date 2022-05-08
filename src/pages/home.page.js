import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

//components
import CustomeButton from "../component/customeButton/cutomeButton.component";
import FormikControl from "../component/formik/formikControl.component";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/auth/auth.selector";
import { loginInUserWithEmailAndPassword } from "../redux/auth/auth.actions";

const HomePage = ({ currentUser, loginInUserWithEmailAndPassword }) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(" ").email("E-Mail ungültig"),

    password: Yup.string()
      .required(" ")
      .min(8, "Password muss mindestens 8 char lang sein"),
  });

  const randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

  if (currentUser) return <Navigate replace to={`/app/${randomNumber}`} />;

  return (
    <div className="container mx-auto p-2 sm:p-6">
      <div className="flex justify-center">
        <div className="max-w-lg w-full">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await loginInUserWithEmailAndPassword(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="email"
                  label={"E-Mail"}
                  placeholder={"Ihre E-Mail"}
                />

                <FormikControl
                  control="input"
                  type="password"
                  name="password"
                  label={"Ihr Passwort"}
                  placeholder={"Passwort"}
                />

                <CustomeButton
                  className="bt-blue w-full mt-12"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isSubmitting={isSubmitting}
                >
                  Login
                </CustomeButton>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-8">Noch kein Konto?</p>
          <Link className="bt-white mt-8 text-lg" to="/signup">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  loginInUserWithEmailAndPassword: (values) =>
    dispatch(loginInUserWithEmailAndPassword(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
