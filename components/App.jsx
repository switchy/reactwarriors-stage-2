import React from "react";
import FormTextField from "./FormTextField";
import FormSteps from "./FormSteps";
import countries from "../data/countries";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      country: 1,
      gender: "female",
      agree: true,
      avatar: "",
      age: 17,
      errors : {},
      _step: 1
    };
  };

  getOptionsItems = items => {
    return items.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  }

  onChangeField = event => {
    let fieldName  = event.target.name
    let fieldValue = event.target.value
    if (event.target.type === "checkbox") {
      fieldValue = event.target.checked
    }
    this.setState({
      [fieldName]: fieldValue
    });
  };

  onChangeFileUploadField = event => {
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({
        avatar: event.target.result
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  onIncDecAge = event => {
    event.preventDefault();
    if (event.target.getAttribute('data-goal') === 'dec') {
      this.setState(
        (prevState) => (
          { age: prevState.age - 1}
        ), () => {
          this.validateAgeRange();
          if (this.state.age < 1) {
            this.setState({
              age: 0
            });
          }
        }
      )
    } else if (event.target.getAttribute('data-goal') === 'inc') {
      this.setState(
        (prevState) => {
          return { age: prevState.age + 1};
        }, () => {
          this.validateAgeRange();
        }
      )
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    let errors = {};
    if (this.state.username.length < 5) {
      errors.username = "Must be 5 characters or more";
    }

    if (this.state.password.length < 3) {
      errors.password = "Must be 3 character or more";
    }

    if (!errors.password && this.state.password !== this.state.repeatPassword) {
      errors.repeatPassword = "Must be equal password";
    }

    errors = Object.assign({}, errors, this.validateAgeRange(false));

    if (Object.keys(errors).length) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: {}
      });
      console.log("submit", this.state)
    }

  };

  validateAgeRange(onBtnRun = true) {
    let errors = {
    };

    if (this.state.age < 1) {
      errors.age =  "Zero age! Is not imposible :)";
    } else if (this.state.age < 18) {
      errors.age = "Age must be 18 or more";
    }

    if (onBtnRun) {
      this.setState({
        errors: errors
      });
    }

    return errors;
  };


  render() {
    return (

      <div className="form-container card mt-5">
        <form className="form card-body mt-5">

          <FormSteps step={this.state._step}/>

          <FormTextField
            labelText="Username"
            type="text"
            id="username"
            name="username"
            placeHolder="Enter username"
            value={this.state.username}
            onChange={this.onChangeField}
            error={this.state.errors.username}
          />

          <FormTextField
            labelText="Password"
            type="password"
            id="password"
            name="password"
            placeHolder="Enter password"
            value={this.state.password}
            onChange={this.onChangeField}
            error={this.state.errors.password}
          />

          <FormTextField
            labelText="Repeat password"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeHolder="Enter repeat password"
            value={this.state.repeatPassword}
            onChange={this.onChangeField}
            error={this.state.errors.repeatPassword}
          />

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="form-control"
              name="country"
              id="country"
              value={this.state.country}
              onChange={this.onChangeField}
            >
              {this.getOptionsItems(countries)}
            </select>
          </div>
          <fieldset className="form-group">
            <div>Gender</div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={this.state.gender === "male"}
                onChange={this.onChangeField}
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={this.state.gender === "female"}
                onChange={this.onChangeField}
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              className="form-control"
              name="avatar"
              id="avatar"
              onChange={this.onChangeFileUploadField}
            />
          </div>

          <div className="form-group">
            <div><label htmlFor="age">Age</label></div>
            <div className="btn-group">
              <button
                className="btn btn-secondary"
                data-goal="dec"
                type="button"
                onClick={this.onIncDecAge}
              >
                –
              </button>
              <input
                className={"form-control" + (this.state.errors.age ? " is-invalid" : "")}
                type="text"
                id="age"
                name="age"
                value={this.state.age}
                onChange={this.onChangeField}
              />
              <button
                className="btn btn-secondary"
                data-goal="inc"
                type="button"
                onClick={this.onIncDecAge}
              >
                +
              </button>
            </div>
            {this.state.errors.age && (
              <div className="invalid-feedback">
                {this.state.errors.age}
              </div>
            )}
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="agree"
              name="agree"
              onChange={this.onChangeField}
              checked={this.state.agree}
            />
            <label htmlFor="agree" className="form-check-label">
              Agree
            </label>
          </div>
          <button type="submit"
            className="btn btn-primary w-100"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
