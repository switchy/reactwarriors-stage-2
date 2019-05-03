import React from "react";

const FormStepsProgress = props => {
  const { step } = props;

  let cssClass = [];
  let labels = [
    "Basic", "Contacts", "Avatar", "Finish"
  ]
  for(let i = 0; i < 4; i++) {
    cssClass.push({
      style: {},
      iconL1: [],
      iconL2: [],
      numL3: []
    });
    if (i < step-1) {
      cssClass[i].iconL1 = ["fas", "fa-circle", "fa-stack-2x", "text-success"];
      cssClass[i].iconL2 = ["far", "fa-circle", "fa-stack-2x", "text-black"];
      cssClass[i].numL3  = ["fa-stack-2x", "text-white"];

    } else if (i === step-1) {
      cssClass[i].iconL1 = ["fas", "fa-circle", "fa-stack-2x", "text-muted"];
      cssClass[i].iconL2 = ["far", "fa-circle", "fa-stack-2x", "text-primary"];
      cssClass[i].numL3  = ["fa-stack-2x", "text-primary"];

    } else {
      cssClass[i].style = {opacity: 0.3};
      cssClass[i].iconL1 = ["fas", "fa-circle", "fa-stack-2x", "text-muted"];
      cssClass[i].iconL2 = ["far", "fa-circle", "fa-stack-2x", "text-black"];
      cssClass[i].numL3  = ["fa-stack-2x"];

    }
  }

  return (
    <div className="steps container mb-3">
      <div className="row">
        {cssClass.map((css, idx) => {
          return (
            <div className="col-3 text-center" key={"form-steps"+idx}>
                <div className="d-none d-md-block">
                  <span className="fa-stack fa-2x" style={css.style}>
                    <i className={css.iconL1.join(" ")}></i>
                    <i className={css.iconL2.join(" ")}></i>
                    <strong className={css.numL3.join(" ")} style={{fontSize: "100%"}}>{idx + 1}</strong>
                  </span>
                  <div><strong>{labels[idx]}</strong></div>
                </div>
                <div className="d-block d-md-none">
                  <span className="fa-stack fa-1x" style={css.style}>
                    <i className={css.iconL1.join(" ")}></i>
                    <i className={css.iconL2.join(" ")}></i>
                    <strong className={css.numL3.join(" ")} style={{fontSize: "100%"}}>{idx + 1}</strong>
                  </span>
                  <div><small>{labels[idx]}</small></div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepsProgress;