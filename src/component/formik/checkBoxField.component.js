import React from "react";

const CheckBoxField = ({ field, options, form: { touched, errors } }) => {
  const show = touched[field.name] && errors[field.name];

  return (
    <div {...field}>
      {options.map((o) => {
        return (
          <div className="relative mb-10 text-left" key={o.key}>
            <p className=" font-bold">{o.key}</p>
            <input
              className="mt-1 h-6 w-6"
              type="checkbox"
              id={o.value}
              {...field}
              value={o.value}
              // checked={field.value.includes(o.value)}
            />
            <label className="ml-2" htmlFor={o.value}>
              {o.text}
            </label>
            <p
              className={`absolute -bottom-10 left-1 text-sm  text-primary-red  
         ${show ? "visible " : "hidden "}`}
            >
              {errors[field.name]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxField;
