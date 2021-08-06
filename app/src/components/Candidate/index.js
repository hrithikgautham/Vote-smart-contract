
import "./style.css";

function Candidate({ candidateAddress , vote, hasVoted}) {
console.log("hasVoted: ", hasVoted)
  return (
    <div className="vote-main">
      <h3>{ candidateAddress }</h3>
      <button disabled={hasVoted} onClick={() => vote(candidateAddress)}>Vote</button>
    </div>
  );
}


export default Candidate;