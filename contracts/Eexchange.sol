// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

/// ERC20 Token address 0x26dd92a46c700c2B15323Fa8f8008c32a7232588
contract Exchange {
    IERC20 token;
    uint256 tokenPrice = 10000;

    event Bought(uint256 tokensToBuy, address buyer);
    event Sold(uint256 tokensToSell, address seller);

    constructor(address _tokenAddress) {
        token = IERC20(address(_tokenAddress));
    }

    function buy() public payable {
        require(msg.value > 0, "Not Enough ETH");
        uint256 amountToBuy = msg.value;
        uint256 tokensToBuy = amountToBuy * tokenPrice;
        uint256 dexBalance = token.balanceOf(address(this));
        require(dexBalance >= tokensToBuy);
        console.log(tokensToBuy);
        token.transfer(msg.sender, tokensToBuy);
        emit Bought(tokensToBuy, msg.sender);
    }

    function sell(uint256 tokensToSell) public {
        require(tokensToSell > 0, "Cannot Sell 0 tokens");
        uint256 approvedAmount = token.allowance(msg.sender, address(this));
        require(
            approvedAmount >= tokensToSell,
            "Cannot exceed allowance limit"
        );
        token.transferFrom(msg.sender, address(this), tokensToSell);
        payable(msg.sender).transfer(tokensToSell / tokenPrice);
        emit Sold(tokensToSell, msg.sender);
    }
}
