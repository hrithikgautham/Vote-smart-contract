// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract Vote {
    address public owner; // user who created this contract
    address[] private votedUsers; // list of users who have already voted
    mapping(address => uint256) private candidtesToVote; // cadidate => number of votes
    address[] private candidtesAddress;// list of all condidates

    constructor(address[] memory candidates) {
        candidtesAddress = candidates;
        owner = msg.sender; // owner of this contract
        for (uint256 i = 0; i < candidates.length; i++) {
            candidtesToVote[candidates[i]] = 0;
        }
    }

    function isCandidate(address candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidtesAddress.length; i++)
            if (candidate == candidtesAddress[i])
                return true;
        return false;
    }

    function vote(address candidate) public returns (bool) {
        for (uint256 i = 0; i < votedUsers.length; i++)
            if (votedUsers[i] == msg.sender) return false;
        votedUsers.push(msg.sender);
        candidtesToVote[candidate]++;
        return true;
    }

    function getWinner() public view returns (address) {
        uint256 max = 0;
        address winner = address(0);
        for (uint256 i = 0; i < candidtesAddress.length; i++) 
            if (candidtesToVote[candidtesAddress[i]] > max) {
                max = candidtesToVote[candidtesAddress[i]];
                winner = candidtesAddress[i];
            }
        return winner;
    }
}
