const path = require('path');
const fs = require('fs');
const solc = require("solc");

const ContractPath = path.resolve(__dirname, "contracts", "Vote.sol");
let contract;

function compile() {
  const data = fs.readFileSync(ContractPath, 'utf-8');

  var input = {
    language: 'Solidity',
    sources: {
      'Vote.sol': {content : data}
    },
    settings: {
      outputSelection: {
        '*': {
          '*': [ '*' ]
        }
      }
    }
  };

  // console.log(data)
  contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Vote.sol"]["Vote"];
  console.log("contract: ", contract.evm.bytecode.object)
}

compile();

module.exports = {
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object
}