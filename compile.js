const path = require('path');
const fs = require('fs');
const solc = require("solc");

const ContractPath = path.resolve(__dirname, "contracts", "Vote.sol");
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

const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Vote.sol"]["Vote"];

module.exports = {
  abi: JSON.stringify(contract.abi),
  bytecode: contract.evm.bytecode.object
}
