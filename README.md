# blockchain-casino
The **Blockchain Casino** is a smart contract developed in Solidity with truffle and React. 

##### Rules:
  - Owner can create any number of [Blockchain Lotteries](https://github.com/Gmitsios/blockchain-lottery)
  - Any account can enter any Lottery
  - The winner is picked randomly after all seats are taken and the Lottery resets
  - Enjoy Responsibly!

![](https://github.com/Gmitsios/blockchain-casino/blob/master/screenshot.png)

### Dependencies:

- install [nodejs](https://nodejs.org/en/) with/and npm
-  `npm i -g truffle`
- install [ganache](https://www.trufflesuite.com/ganache)

Replace the '**MNEMONIC**' in `env.example` and rename it to `.env`

For **Metamask**:
- Add the [extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Generate accounts with the same '**MNEMONIC**'
- Add a new network and connect it to Ganache (port: 7545)

## Migrate on Blockchain:
    
    npm install
    truffle migrate --network ganache_local

### To Test the Migration

    truffle test --network ganache_local

## Run the Front-End React App:

    cd client
    npm install
    npm run start
   