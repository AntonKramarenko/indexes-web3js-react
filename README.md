The design is in figma - https://www.figma.com/file/JUTT5D8VHi1j5ARPcY2W7a/Indexes-test?node-id=0%3A1
Main info:
Use React
You can use Javascript or Typescript as main language
No libraries for the UI components: use plain JS/CSS/HTML
It should be mobile-friendly (!)
Don’t forget to format prices values like in design
Pay attention: contract deployed only to the Ropsten network
There is a smart contract that is deployed on the ROPSTEN network (ETH test network). You should get information from a smart contract and show it in a presentable view on the page. On the top of the page, there is some type of logo (for now it will be only text) and button (it should be clickable but do nothing on click).
You can use web3.js (https://github.com/ethereum/web3.js/) or ethers (https://docs.ethers.io/v5/) for getting this information.

Data for list consist of groups (Solidity smart contract code):

struct Group {
string name;
uint256[] indexes;
}

Group contains a list of ids. Each id represents index:

struct Index {
uint256 id;
string name;
uint256 ethPriceInWei;
uint256 usdPriceInCents;
uint256 usdCapitalization;
uint256 percentageChange;
}

Contract ABI’s serve as an interface to the smart contact:

[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getGroupIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_groupId","type":"uint256"}],"name":"getGroup","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256[]","name":"indexes","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_indexId","type":"uint256"}],"name":"getIndex","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"ethPriceInWei","type":"uint256"},{"internalType":"uint256","name":"usdPriceInCents","type":"uint256"},{"internalType":"uint256","name":"usdCapitalization","type":"uint256"},{"internalType":"int256","name":"percentageChange","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"}]

Contract address is 0x4f7f1380239450AAD5af611DB3c3c1bb51049c29

At first you should get all group ids:

contract.methods.getGroupIds()

Then get group info by it’s id:

contract.methods.getGroup(groupId)

And to get data for each index you should use function:

contract.methods.getIndex(indexId)
