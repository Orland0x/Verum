//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

contract Directory {
    string[] public networks;

    function addNetwork(string calldata _network) public {
      networks.push(_network);
    }

    function getNetworks() public view returns (string[] memory) {
      return networks;
    }
}
