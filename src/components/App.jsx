import React from "react";
import Progress from "./steps/Progress";
import Basic from "./steps/Basic";
import Contacts from "./steps/Contacts";
import Avatar from "./steps/Avatar";
import Finish from "./steps/Finish";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialValues = {
      firstname: "",
      lastname: "",
      password: "",
      repeatPassword: "",
      email: "",
      mobile: "",
      country: "1",
      city: "",
      gender: "",
      avatar: "",
    };

    this.state = {
      values: this.initialValues,
      errors: {},
      step: 1
    };
  }


  onChangeField = event => {
    let fieldName  = event.target.name;
    let fieldValue = event.target.value;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [fieldName]: fieldValue
      }
    }));
  };

  onChangeFileUploadField = event => {
    const reader = new FileReader();
    reader.onload = eventReader => {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          avatar: eventReader.target.result,
        },
        errors: {
          avatar: false
        }
      }));
      document.getElementById("avatarImage")
        .setAttribute("src", eventReader.target.result);
    };

    let doAvatarLoad = true;
    if (event.target.files.length) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
      if (allowedTypes.indexOf(event.target.files[0].type) === -1) {
        //No image select
        this.setState({
          errors: {
            avatar: "Image is not valid format"
          }
        });
        doAvatarLoad = false;
      }
    } else {
      //No image select
      this.setState({
        errors: {
          avatar: "Required"
        }
      });
      doAvatarLoad = false;
    }

    if (doAvatarLoad) {
      reader.readAsDataURL(event.target.files[0]);
    } else {
      document.getElementById("avatarImage")
        .setAttribute("src", Avatar.getImgNoneSrc);
    }

  };

  onResetForm = () => {
    this.setState({
      step: 1,
      errors: {},
      values: this.initialValues
    });
  };

  onPrevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  onNextStep = () => {

    let stepFieldList = {
      1: ["firstname", "lastname", "password", "repeatPassword", "gender"],
      2: ["email", "mobile", "city"],
      3: ["avatar"]
    };

    let errors = {};
    let newVals = {};
    let fields = stepFieldList[this.state.step];

    fields.forEach((item) => {
      if (item in this.state.values) {
        let isEmpty = false;
        switch (typeof this.state.values[item]) {
          case "string": {
            if (this.state.values[item].trim() !== this.state.values[item]) {
              newVals[item] = this.state.values[item].trim();
            }
            !this.state.values[item].trim().length && (isEmpty = true);
            break;
          }
          case "number": {
            isNaN(this.state.values[item]) && (isEmpty = true);
            break;
          }
          default: {

          }
        }

        if (isEmpty) {
          errors[item] = "Required";
        }
      }
    });

    fields.forEach(field => {

      switch (field) {
        case "firstname": {
          if (!errors[field] && this.state.values[field].length < 5) {
            errors[field] = "Must be 5 characters or more";
          }
          break;
        }
        case "lastname": {
          if (!errors[field] && this.state.values[field].length < 5) {
            errors[field] = "Must be 5 characters or more";
          }
          break;
        }
        case "password": {
          if (!errors[field] && this.state.values[field].length < 3) {
            errors[field] = "Must be 3 character or more";
          }
          break;
        }
        case "repeatPassword": {
          if (!errors.password && this.state.values.password !== this.state.values.repeatPassword) {
            errors.repeatPassword = "Must be equal password";
          }
          break;
        }
        case "email": {
          // eslint-disable-next-line no-useless-escape
          let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!errors[field] && !emailRegexp.test(this.state.values[field])) {
            errors[field] = "Invalid email address";
          }
          break;
        }
        case "mobile": {
          let mobileRegexp = /^\d{10}$/;
          if (!errors[field] && !mobileRegexp.test(this.state.values[field])) {
            errors[field] = "Invalid mobile";
          }
          break;
        }
        default: {
          //
        }
      }
    });

    errors = Object.keys(errors)
      .filter(key => (
        errors[key] !== false
      ))
      .reduce((obj, key) => {
        obj[key] = errors[key];
        return obj;
      }, {});

    if (Object.keys(errors).length) {
      this.setState({
        errors: errors,
        values: { ...this.state.values, ...newVals }
      });
    } else {
      let newState= {
        errors: {},
        step: this.state.step + 1,
        values: { ...this.state.values, ...newVals }
      };
      this.setState(newState);
    }

  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12 mx-auto card mt-5">
            <form className="form card-body">

              <Progress step={this.state.step}/>

              { this.state.step === 1 && (
                <Basic
                  errors={this.state.errors}
                  values={this.state.values}
                  onChangeHandler={this.onChangeField}
                  onNextStepHandler={this.onNextStep}
                />
              )}

              { this.state.step === 2 && (
                <Contacts
                  errors={this.state.errors}
                  values={this.state.values}
                  onChangeHandler={this.onChangeField}
                  onNextStepHandler={this.onNextStep}
                  onPrevStepHandler={this.onPrevStep}
                />
              ) }

              { this.state.step === 3 && (
                <Avatar
                  errors={this.state.errors}
                  values={this.state.values}
                  onChangeHandler={this.onChangeFileUploadField}
                  onNextStepHandler={this.onNextStep}
                  onPrevStepHandler={this.onPrevStep}
                />
              ) }

              { this.state.step === 4 && (
                <Finish
                  values={this.state.values}
                  onPrevStepHandler={this.onPrevStep}
                  onResetStepHandler={this.onResetForm}
                />
              )}

            </form>
          </div>
        </div>
      </div>
    );
  }
}
