import React, { Fragment } from "react";
import FormTextField from "./FormTextField";
import FormSelectField from "./FormSelectField";
import countries from "../data/countries";
import citys from "../data/citys";

class FormStep2 extends React.Component {

  render() {
    const { state, onChangeHandler, onNextStepHandler, onPrevStepHandler } = this.props;

    return (
      <Fragment>
        <FormTextField
          labelText="Email"
          type="text"
          id="email"
          name="email"
          placeHolder="Enter email"
          value={state.email}
          onChange={onChangeHandler}
          error={state.errors.email}
        />

        <FormTextField
          labelText="Mobile"
          type="text"
          id="mobile"
          name="mobile"
          placeHolder="Enter mobile"
          value={state.mobile}
          onChange={onChangeHandler}
          error={state.errors.mobile}
        />

        <FormSelectField
          labelText="Country"
          id="country"
          name="country"
          value={state.country}
          options={countries}
          onChange={onChangeHandler}
          error={state.errors.country}
        />

        <FormSelectField
          labelText="City"
          id="city"
          name="city"
          value={state.city}
          options={[{id: "", name: "Select city"}, ...citys]}
          onChange={onChangeHandler}
          error={state.errors.city}
        />

        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-light mr-4"
            onClick={onPrevStepHandler}
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

export default FormStep2;