import React from "react";

const Alert = (props) => {
  function capitalize(word) {
    if (word === "danger") word = "error";
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}: </strong>{" "}
          {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
