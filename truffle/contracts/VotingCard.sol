// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.15;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract VotingCard is Ownable, ERC721 {

    uint256 _tokenId = 1;
    address admin;
    // Mapping owners to tokenId. If voted, returns 0.
    mapping (address => uint256) public mintedWallets;

    constructor() ERC721('Voting Card', 'VTC') {
        admin = msg.sender;
    }

    function mintVotingCard(address to) public{
        require (mintedWallets[to] == 0, "Every wallet can mint one voting card");
        _mint(to, _tokenId);
        mintedWallets[to]= _tokenId;
        _tokenId ++;
    }

    function burnVotingCard() internal {
        require (mintedWallets[msg.sender] != 0, "Wallet has no voting card or it already voted");
        _burn(mintedWallets[msg.sender]);
    }

    function getTokenId(address _address) public view returns(uint256) {
        return mintedWallets[_address];
    }

}