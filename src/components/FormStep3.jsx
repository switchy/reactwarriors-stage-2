import React, {Fragment} from "react";

class FormStep3 extends React.Component {

  static getImgNoneSrc = ('/static/default-avatar.png');

  render() {
    const { state, onChangeHandler, onNextStepHandler, onPrevStepHandler } = this.props;

    return (
      <Fragment>

        <img className="mb-4"
             width="100%"
             id="avatarImage"
             src={ state.avatar || FormStep3.getImgNoneSrc }
             alt=""
        />

        <div className="mb-4">
          <div className="form-group custom-file">
            <input
              type="file"
              className={ "custom-file-input" + (state.errors.avatar ? " is-invalid" : "") }
              id="avatar"
              name="avatar"
              onChange={onChangeHandler}
            />
            <label
              className="custom-file-label"
              htmlFor="customFile"
            >
              Choose avatar
            </label>
            {state.errors.avatar && (
              <div className="invalid-feedback">
                {state.errors.avatar}
              </div>
            )}
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
            onClick={onNextStepHandler}
          >
            Next
          </button>
        </div>

      </Fragment>
    );
  }
}

export default FormStep3;