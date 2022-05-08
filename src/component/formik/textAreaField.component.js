import React from "react";

const TextAreaField = ({
  field,
  label,
  form: { touched, errors },
  ...props
}) => {
  const show = touched[field.name] && errors[field.name];

  return (
    <div className="relative   text-left h-full">
      {label && (
        <label className="ml-1 font-bold text-diffrent-black">{label}</label>
      )}

      <div className="h-full">
        <textarea {...field} {...props} />
      </div>
      <p
        className={`absolute -bottom-5 left-1 text-sm  text-primary-red  
         ${show ? "visible " : "hidden "}`}
      >
        {errors[field.name]}
      </p>
    </div>
  );
};

export default TextAreaField;
