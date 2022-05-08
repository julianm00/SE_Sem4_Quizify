import React from "react";
import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { registerUserWithEmailAndPassword } from "../redux/auth/auth.actions";
import { selectCurrentUser } from "../redux/auth/auth.selector";

//components
import CustomeButton from "../component/customeButton/cutomeButton.component";
import FormikControl from "../component/formik/formikControl.component";

const SignUpPage = ({ registerUserWithEmailAndPassword, currentUser }) => {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required(" ").email("E-Mail ungültig"),

    password: Yup.string()
      .required(" ")
      .min(8, "Password muss mindestens 8 char lang sein"),
    firstname: Yup.string().required(" "),
    lastname: Yup.string().required(" "),
  });

  if (currentUser) return <Navigate replace to="/app" />;

  return (
    <div className="container mx-auto p-2 sm:p-6">
      <div className="flex justify-center">
        <div className="max-w-lg w-full">
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              await registerUserWithEmailAndPassword(values);

              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="email"
                  label={"Ihre E-Mail"}
                  placeholder={"E-Mail"}
                />

                <div className="flex gap-4 justify-between">
                  <FormikControl
                    control="input"
                    type="text"
                    name="firstname"
                    label={"Ihr Vorname"}
                    placeholder={"Vorname"}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="lastname"
                    label={"Ihr Nachname"}
                    placeholder={"Nachname"}
                  />
                </div>

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
                  Erstellen
                </CustomeButton>
              </Form>
            )}
          </Formik>
          <hr className="hr mt-8" />
          <p className="text-center mt-8">Bereits ein Konto?</p>
          <Link className="bt-white mt-8 text-lg" to="/">
            Login
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
  registerUserWithEmailAndPassword: (values) =>
    dispatch(registerUserWithEmailAndPassword(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
