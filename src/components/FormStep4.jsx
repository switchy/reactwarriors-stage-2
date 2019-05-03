import React, {Fragment} from "react";
import countries from "../data/countries";
import citys from "../data/citys";


class FormStep4 extends React.Component {

  render() {
    const { state, onPrevStepHandler, onResetStepHandler } = this.props;

    return (
      <Fragment>

        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-4">
              <img
                width="100%"
                src={ state.avatar }
                alt=""
              />
            </div>
            <div className="col-8 d-flex align-items-center">
              <h4>{state.firstname} {state.lastname}</h4>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <p><strong>Gender:</strong> {state.gender}</p>
              <p><strong>Email:</strong> {state.email}</p>
              <p><strong>Mobile:</strong> {state.mobile}</p>
              <p><strong>Location:</strong> {
                countries.find((value) => (value.id == state.country)).name
              }, {
                citys.find((value) => (value.id == state.city)).name
              }
              </p>
            </div>
          </div>
        </div>

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
            onClick={onResetStepHandler}
          >
            Reset
          </button>
        </div>

      </Fragment>
    );
  }
}

export default FormStep4;