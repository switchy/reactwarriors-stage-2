import React from "react";
import FormStepsProgress from "./FormStepsProgress";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
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

    this.state = { ...this.initialState, errors : {}, _step: 1 };
  }


  onChangeField = (event) => {
    let fieldName  = event.target.name;
    let fieldValue = event.target.value;
    if (event.target.type === "checkbox") {
      fieldValue = event.target.checked;
    }
    this.setState({
      [fieldName]: fieldValue
    });
  };

  onChangeFileUploadField = event => {
    const reader = new FileReader();
    reader.onload = eventReader => {
      this.setState({
        avatar: eventReader.target.result,
        errors: {
          avatar: false
        }
      });
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
        .setAttribute("src", FormStep3.getImgNoneSrc);
    }

  };

  onResetForm = event => {
    let newState= {
      errors: {},
      _step: 1
    };
    newState = { ...newState, ...this.initialState };
    this.setState(newState);
  };

  onPrevStep = (step, event) => {
    this.setState({_step: step});
  };

  onNextStep = (step, event) => {

    let stepFieldList = {
      1: ["firstname", "lastname", "password", "repeatPassword", "gender"],
      2: ["email", "mobile", "city"],
      3: ["avatar"]
    };

    let errors = {};
    let fields = [];
    for(let i = 1; i < step; i++) {
      fields = [fields, ...stepFieldList[i]];
    }

    fields.forEach((item) => {
      if (item in this.state) {
        let isEmpty = false;
        switch (typeof this.state[item]) {
        case "string": {
          this.state[item] = this.state[item].trim();
          !this.state[item].trim().length && (isEmpty = true);
          break;
        }
        case "number": {
          isNaN(this.state[item]) && (isEmpty = true);
          break;
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
        if (!errors[field] && this.state[field].length < 5) {
          errors[field] = "Must be 5 characters or more";
        }
        break;
      }
      case "lastname": {
        if (!errors[field] && this.state[field].length < 5) {
          errors[field] = "Must be 5 characters or more";
        }
        break;
      }
      case "password": {
        if (!errors[field] && this.state[field].length < 3) {
          errors[field] = "Must be 3 character or more";
        }
        break;
      }
      case "repeatPassword": {
        if (!errors.password && this.state.password !== this.state.repeatPassword) {
          errors.repeatPassword = "Must be equal password";
        }
        break;
      }
      case "email": {
        // eslint-disable-next-line no-useless-escape
        let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!errors[field] && !emailRegexp.test(this.state[field])) {
          errors[field] = "Invalid email address";
        }
        break;
      }
      case "mobile": {
        let mobileRegexp = /^\d{10}$/;
        if (!errors[field] && !mobileRegexp.test(this.state[field])) {
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
        errors: errors
      });
    } else {
      let newState= {
        errors: {},
        _step: step
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

              <FormStepsProgress step={this.state._step}/>

              { this.state._step === 1 && (
                <FormStep1
                  state={this.state}
                  onChangeHandler={this.onChangeField}
                  onNextStepHandler={(e) => this.onNextStep(2, e)}
                />
              )}

              { this.state._step === 2 && (
                <FormStep2
                  state={this.state}
                  onChangeHandler={this.onChangeField}
                  onNextStepHandler={(e) => this.onNextStep(3, e)}
                  onPrevStepHandler={(e) => this.onPrevStep(1, e)}
                />
              ) }

              { this.state._step === 3 && (
                <FormStep3
                  state={this.state}
                  onChangeHandler={this.onChangeFileUploadField}
                  onNextStepHandler={(e) => this.onNextStep(4, e)}
                  onPrevStepHandler={(e) => this.onPrevStep(2, e)}
                />
              ) }

              { this.state._step === 4 && (
                <FormStep4
                  state={this.state}
                  onPrevStepHandler={(e) => this.onPrevStep(3, e)}
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
