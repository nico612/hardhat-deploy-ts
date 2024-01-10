// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TRCWallet.sol";

contract TRCWalletFactory is Ownable {

    mapping (address => address) wallets;

    event WithDraw(address wallet, address token, address receiver);

    // deploy and withdraw token 
    function withdraw(bytes32 _salt, address _wallet, address _token, address payable _receiver) external onlyOwner()  {

        TRCWallet trcWallet = new TRCWallet{salt: _salt}();
        require(_wallet == address(trcWallet), "WalletFactory: wallet not match salt");

        trcWallet.transfer(_token, _receiver);
        emit WithDraw(_wallet, _token, _receiver);
    }

    function predictedAddress(bytes32 _salt) external view returns (address) {
        return address(uint160(uint(keccak256(abi.encodePacked(
             bytes1(0xff),
             address(this),
             _salt,
             keccak256(abi.encodePacked(
                type(TRCWallet).creationCode
             ))

        )))));
    }

}