// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


interface IToken {
    function balanceOf(address who) external  returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
}

contract TRCWallet {

    address private _owner;

    event Withdraw(address caller, address token, address to, uint256 amount);

    modifier onlyOwner {
        require(msg.sender == _owner, "Wallect: caller is not the owner");
        _;
    }

    constructor ()  {
        _owner = msg.sender;
    }

    function transfer(address token, address payable to) payable  external onlyOwner {
        require(token != address(0), "Wallect: token not be zero");

        uint256 amount = IToken(token).balanceOf(address(this));
        IToken(token).transfer(to, amount);
        
        emit Withdraw(msg.sender, token, to, amount);

        selfdestruct(to);
    }

}

