import React, { Fragment } from "react";
import countries from "../../data/countries";
import citys from "../../data/citys";


class Finish extends React.Component {

  render() {
    const { values, onPrevStepHandler, onResetStepHandler } = this.props;

    return (
      <Fragment>

        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-4">
              <img
                width="100%"
                src={values.avatar}
                alt=""
              />
            </div>
            <div className="col-8 d-flex align-items-center">
              <h4>{values.firstname} {values.lastname}</h4>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <p><strong>Gender:</strong> {values.gender}</p>
              <p><strong>Email:</strong> {values.email}</p>
              <p><strong>Mobile:</strong> {values.mobile}</p>
              <p><strong>Location:</strong> {
                countries.find((value) => (Number(value.id) === Number(values.country))).name
              }, {
                citys.find((value) => (Number(value.id) === Number(values.city))).name
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

export default Finish;