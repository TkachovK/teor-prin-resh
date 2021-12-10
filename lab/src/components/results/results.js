import React, { useState, useEffect } from "react";
import "./results.css";

function Results() {
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [results3, setResults3] = useState([]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("answers1"));
    setResults1({ ...storageData });
  }, [setResults1]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("answers2"));
    setResults2({ ...storageData });
  }, [setResults2]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("answers3"));
    setResults3({ ...storageData });
  }, [setResults3]);

  return (
    <div className="box">
      <p>Загальна теорія</p>
      <ul className="results">
        {Object.entries(results1).map((res, index) => {
          console.log(res);
          if (res[1]) {
            return (
              <li className="true" key={index}>
                {index + 1}: Відповідь вірна
              </li>
            );
          } else {
            return (
              <li className="false" key={index}>
                {index + 1}: Відповідь невірна
              </li>
            );
          }
        })}
      </ul>
      <p>Bayers</p>
      <ul className="results">
        {Object.entries(results2).map((res, index) => {
          console.log(res);
          if (res[1]) {
            return (
              <li className="true" key={index}>
                {index + 1}: Відповідь вірна
              </li>
            );
          } else {
            return (
              <li className="false" key={index}>
                {index + 1}: Відповідь невірна
              </li>
            );
          }
        })}
      </ul>
      <p>Gurviz</p>
      <ul className="results">
        {Object.entries(results3).map((res, index) => {
          console.log(res);
          if (res[1]) {
            return (
              <li className="true" key={index}>
                {index + 1}: Відповідь вірна
              </li>
            );
          } else {
            return (
              <li className="false" key={index}>
                {index + 1}: Відповідь невірна
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Results;
