const WalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");


console.log("abi: ", abi)
// console.log("bytecode: ", bytecode)

const walletProvider = new WalletProvider(
  "bitter repair century thumb such kit huge math joke genre eagle beef", 
  "https://ropsten.infura.io/v3/653764b5bbc54a1a814c5c4eb97e4076"
);

const web3 = new Web3(walletProvider);

let accounts, contract;

// const CONTRACT_ADDRESS = "0xcD516702f8Cb2752e7bAa24B1d3C2fa57ACb79BB";

async function deploy() {
  try {
    // console.log(web3.eth)
    accounts = await web3.eth.getAccounts();

    console.log("accounts: ", accounts);
    const balance = await web3.eth.getBalance(accounts[0]);

    console.log("contract creation address: ", accounts[0]);
    console.log("account balance: ", balance);


    contract = await new web3.eth.Contract(JSON.parse(abi))
      .deploy({ data: bytecode, arguments: [["0xEDD468DC605118be3b4dE36e2C975302121C2def", "0x03772Cd233dbd4F0871Ff82378a2eC74Cf3DC089"]]})
      .send({ from: accounts[0], gas: "5000000" });

    console.log("contract address: ", contract.options.address)
  }
  catch(err) {
    console.error(err)
  }
}

deploy();

module.exports = {
  // deploy,
  accounts,
  contract
}