import { Field } from "formik";
import React from "react";

const FormikSelect = ({
  field,
  label,
  options,
  form: { touched, errors, setFieldValue },
  setValue,
  ...props
}) => {
  const show = touched[field.name] && errors[field.name];

  return (
    <div className="relative text-left my-6 w-full">
      <label>
        <span className="ml-1 font-bold text-diffrent-black">{label}</span>
        <select
          className="form-select  mt-2 rounded-md p-4 "
          {...props}
          {...field}
          onChange={(e) => {
            const val = e.target.value;
            setFieldValue(field.name, val);
            setValue && setValue(val);
          }}
        >
          {options.map((option) => {
            return (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            );
          })}
        </select>
      </label>
      <p
        className={`absolute -bottom-5 left-1 text-sm  text-primary-red  
         ${show ? "visible " : "hidden "}`}
      >
        {errors[field.name]}
      </p>
    </div>
  );
};

export default FormikSelect;
