import React from "react";

//styled
import { FieldErrorMessage, FieldContainer } from "./formik.styled";

const RadioField = ({ field, options, form: { touched, errors } }) => {
  return (
    <div>
      <FieldContainer {...field} row>
        {options.map((o) => {
          return (
            <div key={o.key}>
              <input
                type="radio"
                id={o.value}
                {...field}
                value={o.value}
                checked={field.value === o.value}
              />
              <label className="text-diffrent-black" htmlFor={o.value}>
                {o.key}
              </label>
            </div>
          );
        })}
      </FieldContainer>
      <FieldErrorMessage show={!!errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </FieldErrorMessage>
    </div>
  );
};

export default RadioField;
