// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.15;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import "./VotingCard.sol";

contract Election is Ownable, VotingCard {
    struct Candidate {
        uint256 id;
        string name;
        string slogan;
        uint256 voteCount;
    }
    mapping (uint256  => Candidate) public candidates;
    uint16 public candidatesCount;
    bool isVotingOpen;

      constructor () {
        addCandidate('Donald Trump', 'Make America Great Again!');
        addCandidate('Barack Obama', 'Yes We Can!');
        addCandidate('Hillary Clinton', 'Ready for change, ready to lead!');
    }

    function getCandidatesCount () onlyOwner public view returns (uint16) {
        return candidatesCount;
    }

    function addCandidate(string memory _name, string memory _slogan) onlyOwner public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _slogan, 0);
    }

    function toggleIsVotingOpen() onlyOwner public  {
        isVotingOpen = !isVotingOpen;
    }
    
    function getIsVotingOpenValue() public view returns (bool) {
        return isVotingOpen;
    }

    function donate() public payable{
        
    }

    function voteCandidate( uint256  _id) public {
        require(mintedWallets[msg.sender] != 0, "Voting card is necessary!");
        burnVotingCard();
        candidates[_id].voteCount++;
    }
  
}