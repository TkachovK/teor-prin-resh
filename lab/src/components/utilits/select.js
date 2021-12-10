import React from "react";
import "./select.css"

const Select = props => {
  return (
    <div className="form-group">
      <label className="select" for={props.name}> {props.title} </label>
      <select 
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-control"
      >
        <option value="" disabled selected>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
