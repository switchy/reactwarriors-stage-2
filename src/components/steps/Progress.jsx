import React from "react";

const Progress = props => {
  const { step } = props;

  let labels = [
    "Basic", "Contacts", "Avatar", "Finish"
  ];

  let cssClass = [0, 1, 2, 3].reduce((item, i) => {
    item.push({
      style: {},
      iconL1: ["fas", "fa-circle", "fa-stack-2x"],
      iconL2: ["far", "fa-circle", "fa-stack-2x"],
      numL3: ["fa-stack-2x"]
    });
    if (i < step - 1) {
      item[i].iconL1.push("text-success");
      item[i].iconL2.push("text-black");
      item[i].numL3.push("text-white");

    } else if (i === step - 1) {
      item[i].iconL1.push("text-muted");
      item[i].iconL2.push("text-primary");
      item[i].numL3.push("text-primary");

    } else {
      item[i].style = {opacity: 0.3};
      item[i].iconL1.push("text-muted");
      item[i].iconL2.push("text-black");
      item[i].numL3.push("fa-stack-2x");

    }
    return item;
  }, []);

  return (
    <div className="steps container mb-3">
      <div className="row">
        {cssClass.map((css, idx) => {
          return (
            <div className="col-3 pl-0 pr-0 text-center" key={idx}>
              <div className="d-none d-md-block">
                <span className="fa-stack fa-2x" style={css.style}>
                  <i className={css.iconL1.join(" ")} />
                  <i className={css.iconL2.join(" ")} />
                  <strong className={css.numL3.join(" ")} style={{fontSize: "100%"}}>{idx + 1}</strong>
                </span>
                <div><strong>{labels[idx]}</strong></div>
              </div>
              <div className="d-block d-md-none">
                <span className="fa-stack fa-1x" style={ css.style }>
                  <i className={css.iconL1.join(" ")} />
                  <i className={css.iconL2.join(" ")} />
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

export default Progress;