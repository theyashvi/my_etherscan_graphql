const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik Buterin's public Ethereum address 
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; 

// Custom data source class that extends the base RESTDataSource
// Used to make requests to the Etherscan API
class EtherDataSource extends RESTDataSource {

  // Set the base URL for Etherscan API requests
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api"; 
  }

  // Get account ETH balance for the defined address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }
  
  // Get total ETH supply in the network
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Get latest ETH price in USD
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Get estimated block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;
