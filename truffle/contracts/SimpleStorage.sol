// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;

  mapping (uint => string) public mapToString;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    mapToString[1] = "One";
    value = newValue;
  }
}
