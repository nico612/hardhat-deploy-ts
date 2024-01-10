// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EVMWallet {
    address private _owner;
    event Withdraw(address caller, address token, address to, uint256 amount);

    modifier onlyOwner {
        require(msg.sender == _owner, "Wallet: caller is not the owner");
        _;
    }

    constructor ()  {
        _owner = msg.sender;
    }

    function withdraw(address token, address payable to) payable  external onlyOwner {

        if (token == address(0)) {
            // withdraw eth
            uint256 ethAmount = address(this).balance;
            to.transfer(ethAmount);
            emit Withdraw(msg.sender, token, to, ethAmount);
        }

        // withdraw token, 这里不兼容 eth 的 usdt token
        uint256 amount = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(to, amount);
        emit Withdraw(msg.sender, token, to, amount);

        // 根据需要，可以在提现后销毁合约
        // selfdestruct(to);
    }

}