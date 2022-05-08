import React from "react";
import { Field } from "formik";

//components
import InputField from "./inputField.component";
import SelectField from "./selectField.component";
import TextAreaField from "./textAreaField.component";
// import RadioField from "./radioField.component";
import CheckBoxField from "./checkBoxField.component";

//decides what foromik component is rendert
const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Field component={InputField} {...rest} />;

    case "textarea":
      return <Field component={TextAreaField} {...rest} />;
    // case "radio":
    //   return <Field component={RadioField} {...rest} />;
    case "checkbox":
      return <Field component={CheckBoxField} {...rest} />;
    case "select":
      return <Field component={SelectField} {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
