const VotingCard = artifacts.require("VotingCard");

module.exports = function (deployer) {
    deployer.deploy(VotingCard);
};
