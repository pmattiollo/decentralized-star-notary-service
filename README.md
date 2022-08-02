# ERC721 Pedro Star Token
**Decentralized Star Notary Service Project** - This DApp allows managing ERC721 Pedro Star Tokens and the contract can be verified on the public Rinkeby network.

### Project build configuration
* Truffle v5.5.23 (core: 5.5.23)
* Ganache v7.3.2
* Solidity - 0.8.15 (solc-js)
* Node v16.16.0
* Web3.js v1.7.4
* OpenZeppelin 4.7.2

### Token details
* Name: Pedro Star
* Symbol: PST
* Address on Rinkeby: 0xD6eA51dD1cF02C7a96B4335F277D610C3Fc92b7F

### Deployment result
```bash
Deploying 'StarNotary'
----------------------
> transaction hash:    0xdb61e03540346e05ec4775ce2e1850c2bd878fd95e7b992b08c95885b36e63df
> Blocks: 1            Seconds: 12
> contract address:    0xD6eA51dD1cF02C7a96B4335F277D610C3Fc92b7F
> block number:        11131553
> block timestamp:     1659434935
> account:             0xeAFe3C31f128d7b66114BD16f1d57aC7B2Ba3128
> balance:             0.191414852382805103
> gas used:            2870151 (0x2bcb87)
> gas price:           2.500000036 gwei
> value sent:          0 ETH
> total cost:          0.007175377603325436 ETH
````

### Dependencies
For this project, you will need to have:
1. **Node and NPM** installed - NPM is distributed with [Node.js](https://www.npmjs.com/get-npm)
```bash
# Check Node version
node -v
# Check NPM version
npm -v
```


2. **Truffle v5.X.X** - A development framework for Ethereum. 
```bash
# Unsinstall any previous version
npm uninstall -g truffle
# Install
npm install -g truffle
# Specify a particular version
npm install -g truffle@5
# Verify the version
truffle version
```


2. **Metamask: 10.17.0** - If you need to update Metamask just delete your Metamask extension and install it again.


3. [Ganache](https://www.trufflesuite.com/ganache) - Make sure that your Ganache and Truffle configuration file have the same port.


4. **Other mandatory packages**:
```bash
# install in the root
npm install @openzeppelin/contracts@4.7.2
npm install @truffle/hdwallet-provider@2.0.12

cd app
# install packages
npm install webpack-dev-server -g
npm install web3
```


### Run the application
1. Clean the frontend 
```bash
cd app
# Remove the node_modules  
# remove packages
rm -rf node_modules
# clean cache
npm cache clean
rm package-lock.json
# initialize npm (you can accept defaults)
npm init
# install all modules listed as dependencies in package.json
npm install
```


2. Start Truffle by running
```bash
# For starting the development console
truffle develop
# truffle console

# For compiling the contract, inside the development console, run:
compile

# For migrating the contract to the locally running Ethereum network, inside the development console
migrate --reset

# For running unit tests the contract, inside the development console, run:
test
```

3. Frontend - Once you are ready to start your frontend, run the following from the app folder:
```bash
cd app
npm run dev
```

---

### Important
When you will add a new Rinkeyby Test Network in your Metamask client, you will have to provide:

| Network Name | New RPC URL | Chain ID |
|---|---|---|
|Private Network 1|`http://127.0.0.1:9545/`|1337 |

The chain ID above can be fetched by:
```bash
cd app
node index.js
```

## Troubleshoot
#### Error 1 
```
'webpack-dev-server' is not recognized as an internal or external command
```
**Solution:**
- Delete the node_modules folder, the one within the /app folder
- Execute `npm install` command from the /app folder

After a long install, everything will work just fine!


#### Error 2
```
ParserError: Source file requires different compiler version. 
Error: Truffle is currently using solc x.x.x, but one or more of your contracts specify "pragma solidity >=0.X.X <0.X.X".
```
**Solution:** In such a case, ensure the following in `truffle-config.js`:
```js
// Configure your compilers  
compilers: {    
  solc: {
    version: "0.8.15", // <- Use this        
    // docker: true,
    // ...
```

## Raise a PR or report an Issue
1. Feel free to raise a [Pull Request](https://github.com/udacity/nd1309-p2-Decentralized-Star-Notary-Service-Starter-Code/pulls) if you find a bug/scope of improvement in the current repository. 

2. If you have suggestions or facing issues, you can log in issue. 

---

Do not use the [Old depreacted zipped starter code](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/January/5c51c4c0_project-5-starter-code/project-5-starter-code.zip)
