import './App.css';
import CONTRACT_ABI from "./imp/abi.json";

import { useEffect, useState } from "react";
import Web3 from "web3";
import Header from './components/Header';
import CandidatesGrid from './components/CandidatesGrid';
import Loading from './components/Loading';
import Winner from './components/Winner';

// console.log("abi: ", abi)

function App() {

  

  const CONTRACT_ADDRESS = "0x66D1b6436c28A38D80948CAaE7065D362bA39505";
  // const CONTRACT_ABI = "";

  const [USER_ADDRESS, setUserAddress] = useState();
  const [candidates, setCandidates] = useState();
  const [hasVoted, setHasVoted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [winners, setWinners] = useState();
  const [success, setSuccess] = useState(true);
  // let web3;


  window.ethereum.on('accountsChanged', async function (accounts) {
    console.log("changed accounts: ", accounts);
    setShowLoader(true);
    const contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    setUserAddress(accounts[0]);
    setHasVoted(await contract.methods.hasVoted().call({ from: accounts[0] }));
    setShowLoader(false)
  });
  // let contract;

  useEffect(() => {// componentDidMount()

    async function init() {
      // showLoader = true;
      window.web3 = new Web3(window.web3.currentProvider);// create web3 instance
      const accounts = await window.web3.eth.getAccounts();
      const contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);// fetch the contract
      setUserAddress(accounts[0]);
      setCandidates(await contract.methods.getAllCandidates().call());
      setWinners(await contract.methods.getWinner().call());
      setHasVoted(await contract.methods.hasVoted().call({ from: USER_ADDRESS }));

      console.log("contract: ", contract);
      // console.log("candidates: ", candidates);

      // gives aray of one address
      // set the user address
      
      setShowLoader(false);
    }
    init();
  }, []);

  async function vote(votedAddress) {
    try {
      const contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);// fetch the contract
      setShowLoader(true);
      console.log("voted address: ", votedAddress);
      const transactionMetadata = await contract.methods.vote(votedAddress).send({ from: USER_ADDRESS });
      console.log("transactionMetadata: ", transactionMetadata)
      setWinners(await contract.methods.getWinner().call());
      setHasVoted(await contract.methods.hasVoted().call());
      setShowLoader(false);
    }
    catch(err) {
      if(err.code === 4001) {
        setSuccess(false);
        setShowLoader(false);
      }
    }
  }

  return (
    <div>
      { showLoader && <Loading /> }
      <Header address={ USER_ADDRESS }/>
      <Winner winners={winners}/>
      <CandidatesGrid candidates={candidates} vote={vote} hasVoted={hasVoted}/>
    </div>
  );
}

export default App;
