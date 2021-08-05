const WalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const walletProvider = new WalletProvider(
  "bitter repair century thumb such kit huge math joke genre eagle beef", 
  "https://ropsten.infura.io/v3/23d30c81486d4e23a798041525425d26"
);

const web3 = new Web3(walletProvider);

let accounts, contract;

const CONTRACT_ADDRESS = "0xcD516702f8Cb2752e7bAa24B1d3C2fa57ACb79BB";

async function deploy() {
  try {
    accounts = await web3.eth.getAccounts();
    console.log("accounts: ", accounts);
    const balance = await web3.eth.getBalance(accounts[0]);

    console.log("contract creation address: ", accounts[0]);
    console.log("account balance: ", balance);


    contract = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: "1000000" });

    // console.log(contract);
    // contract = await new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    console.log("deployed contract address: ", contract.options.address);

    // const voted = await contract.methods.tails().call()

    
    // const callbackMessage = await contract.methods.setMessage("Modified Message").send({ from: accounts[0] });
    // console.log("callbackMessage: ", callbackMessage);

    console.log("message: ", voted )
  }
  catch(err) {
    
  }
}

deploy();

module.exports = {
  // deploy,
  accounts,
  contract
}