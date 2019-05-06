import React from "react";

const FormTextField = props => {
  const {
    id,
    type,
    labelText,
    placeHolder,
    name,
    value,
    error,
    onChange
  } = props;

  let optAttrs = {};
  if (placeHolder) {
    optAttrs.placeholder = placeHolder;
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        className={`form-control ${error ? " is-invalid" : ""}`}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        {...optAttrs}
      />
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormTextField;
