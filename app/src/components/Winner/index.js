import React from "react";
import "./style.css";

function Winner({ winners }) {
  return (
    <div className="winners-container">
      <h2>your Winner/Winners are: </h2>
      {winners && winners.length > 0 ? (
        winners
          .filter((winner) => Number(winner))
          .map((winner, index) => <p key={index}>{winner}</p>)
      ) : (
        <p>No Winners!!!</p>
      )}
    </div>
  );
}

export default Winner;
