import React from "react";

class FormSelectField extends React.Component {

  getOptionsItems = items => {
    return items.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  render() {
    const {
      id,
      labelText,
      name,
      value,
      error,
      onChange,
      options
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="country">{labelText}</label>
        <select
          className={`form-control ${error ? " is-invalid" : ""}`}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        >
          {this.getOptionsItems(options)}
        </select>
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )}
      </div>
    );
  }
}

export default FormSelectField;
