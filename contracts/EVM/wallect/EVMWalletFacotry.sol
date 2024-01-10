// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./EVMWallet.sol";

contract EVMWalletFactory is Ownable {

    mapping (address => address) wallets;

    event WithDraw(address wallet, address token, address receiver);

    // deploy and withdraw token 
    function withdraw(bytes32 _salt, address _wallet, address _token, address payable _receiver) external onlyOwner()  {

        // 根据codesize判断钱包合约是否已经部署过
        uint256 size;
        assembly { size := extcodesize(_wallet) }
        EVMWallet evmWallet;

        if (size == 0) {
            evmWallet = new EVMWallet{salt: _salt}();
            require(_wallet == address(evmWallet), "WalletFactory: wallet not match salt");
        } else {
            evmWallet = EVMWallet(_wallet);
        }

        evmWallet.withdraw(_token, _receiver);
        emit WithDraw(_wallet, _token, _receiver);
    }

    function predictedAddress(bytes32 _salt) external view returns (address) {
        return address(uint160(uint(keccak256(abi.encodePacked(
             bytes1(0xff),
             address(this),
             _salt,
             keccak256(abi.encodePacked(
                type(EVMWallet).creationCode
             ))

        )))));
    }

}