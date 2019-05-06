import React, { Fragment } from "react";
import FormTextField from "../FormTextField";

class Basic extends React.Component {

  render() {
    const { values, errors, onChangeHandler, onNextStepHandler } = this.props;

    return (
      <Fragment>
        <FormTextField
          labelText="Firstname"
          type="text"
          id="firstname"
          name="firstname"
          placeHolder="Enter firstname"
          value={values.firstname}
          onChange={onChangeHandler}
          error={errors.firstname}
        />

        <FormTextField
          labelText="Lastname"
          type="text"
          id="lastname"
          name="lastname"
          placeHolder="Enter lastname"
          value={values.lastname}
          onChange={onChangeHandler}
          error={errors.lastname}
        />

        <FormTextField
          labelText="Password"
          type="password"
          id="password"
          name="password"
          placeHolder="Enter password"
          value={values.password}
          onChange={onChangeHandler}
          error={errors.password}
        />

        <FormTextField
          labelText="Repeat password"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeHolder="Enter repeat password"
          value={values.repeatPassword}
          onChange={onChangeHandler}
          error={errors.repeatPassword}
        />

        <fieldset className="form-group">
          <div>Gender</div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              className={`custom-control-input ${errors.gender ? " is-invalid" : ""}`}
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={values.gender === "male"}
              onChange={onChangeHandler}
            />
            <label htmlFor="male" className="custom-control-label">
              Male
            </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              className={`custom-control-input ${errors.gender ? " is-invalid" : ""}`}
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={values.gender === "female"}
              onChange={onChangeHandler}
            />
            <label htmlFor="female" className="custom-control-label">
              Female
            </label>
          </div>
          <div /*
              Ногами не бити, по іншому invalid-feedback не виходить гарно розмістити.
              Є відкритий issue https://github.com/twbs/bootstrap/issues/25540
              */
            className={`custom-control-input ${errors.gender ? " is-invalid" : ""}`} />
          {errors.gender && (
            <div className="invalid-feedback">
              {errors.gender}
            </div>
          )}
        </fieldset>

        <div className="d-flex justify-content-center">
          <button
            disabled
            type="button"
            className="btn btn-light mr-4"
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onNextStepHandler}
          >
            Next
          </button>
        </div>

      </Fragment>
    );
  }
}

export default Basic;