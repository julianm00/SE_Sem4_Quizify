import React from "react";

//styled
// import { StyledInputField } from "./inputField.styled";
// import { FieldContainer, FieldErrorMessage } from "./formik.styled";

const InputField = ({ field, label, form: { touched, errors }, ...props }) => {
  const show = touched[field.name] && errors[field.name];

  return (
    <div className="relative my-6 text-left w-full ">
      {label && (
        <label className="ml-1 font-bold text-diffrent-black">{label}</label>
      )}
      <div className="mt-2">
        <input
          className={show && ` border-primary-red`}
          {...field}
          {...props}
        />
      </div>
      <p
        className={`absolute -bottom-6 left-1 text-sm  text-primary-red  
         ${show ? "visible " : "hidden "}`}
      >
        {errors[field.name]}
      </p>
    </div>
  );
};

export default InputField;
