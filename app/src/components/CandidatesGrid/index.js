import React from "react";
import Candidate from "../Candidate";
import "./style.css";

function CandidatesGrid({ candidates, vote, hasVoted }) {
  console.log("candidates in  CandidatesGrid component: ", candidates);
  return (
    <React.Fragment>
      {!hasVoted ? (
        <div className="vote-grid">
          {candidates && candidates.length > 0 && (
            <React.Fragment>
              {candidates.map((candidateAddress, index) => (
                <Candidate
                  candidateAddress={candidateAddress}
                  vote={vote}
                  hasVoted={hasVoted}
                  key={index}
                />
              ))}
            </React.Fragment>
          )}
        </div>
      ) : 
      (
        <div className="voted">
          <p>You have already voted!</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default CandidatesGrid;
