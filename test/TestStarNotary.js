const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can create a Star', async() => {
    let instance = await StarNotary.deployed();
    let starId = 1;

    await instance.createStar('Awesome Star!', starId, {from: accounts[0]});
    const starName = await instance.tokenIdToStarInfo.call(starId);

    expect(starName).to.equal('Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    const tokenPrice = await instance.starsForSale.call(starId);

    expect(tokenPrice.toString()).to.equal(starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);

    expect(value1).to.equal(value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    await instance.buyStar(starId, {from: user2, value: balance});
    const newStarOwner = await instance.ownerOf.call(starId);

    expect(newStarOwner).to.equal(user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});

    const balanceOfUser2BeforeTransaction = web3.utils.toBN(await web3.eth.getBalance(user2));
    const transaction = await instance.buyStar(starId, {from: user2, value: balance});
    const balanceAfterUser2BuysStar = web3.utils.toBN(await web3.eth.getBalance(user2));

    // Calculate used gas
    const gasUsed = web3.utils.toBN(transaction.receipt.gasUsed);
    const gasPrice = web3.utils.toBN(transaction.receipt.effectiveGasPrice);
    const gasCost = gasPrice.mul(gasUsed);

    const expectedFinalBalance = balanceOfUser2BeforeTransaction
        .sub(gasCost)
        .sub(web3.utils.toBN(starPrice));

    expect(expectedFinalBalance.toString()).to.equal(balanceAfterUser2BuysStar.toString());
});

// Implement Task 2 Add supporting unit tests
it('can add the star name and star symbol properly', async() => {
    // 1. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    let instance = await StarNotary.deployed();

    const symbol = await instance.symbol.call();
    const name = await instance.name.call();

    expect(symbol).to.equal('PST');
    expect(name).to.equal('Pedro Star');
});

it('lets 2 users exchange stars', async() => {
    // 1. create 2 Stars with different tokenId
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    // 3. Verify that the owners changed
    let instance = await StarNotary.deployed();

    let user1 = accounts[1];
    let starId1 = 7;
    await instance.createStar('awesome star 1', starId1, {from: user1});
    let user2 = accounts[2];
    let starId2 = 8;
    await instance.createStar('awesome star 2', starId2, {from: user2});

    await instance.exchangeStars(starId1, starId2, {from: user1})
    const starOwner1 = await instance.ownerOf.call(starId1);
    const starOwner2 = await instance.ownerOf.call(starId2);

    expect(starOwner1).to.equal(user2);
    expect(starOwner2).to.equal(user1);
});

it('lets a user transfer a star', async() => {
    // 1. create a Star with different tokenId
    // 2. use the transferStar function implemented in the Smart Contract
    // 3. Verify the star owner changed.
    let instance = await StarNotary.deployed();

    let user1 = accounts[1];
    let starId = 9;
    await instance.createStar('another awesome star', starId, {from: user1});

    let newOwner = accounts[2];
    await instance.transferStar(newOwner, starId, {from: user1})

    const starOwner = await instance.ownerOf.call(starId);
    expect(starOwner).to.equal(newOwner);
});

it('lookUptokenIdToStarInfo test', async() => {
    // 1. create a Star with different tokenId
    // 2. Call your method lookUptokenIdToStarInfo
    // 3. Verify if you Star name is the same
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 10;

    await instance.createStar('Newly star', starId, {from: user1});
    const starName = await instance.lookUptokenIdToStarInfo.call(starId);

    expect(starName).to.equal('Newly star');
});