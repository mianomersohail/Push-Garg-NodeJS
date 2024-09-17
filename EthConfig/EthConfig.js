require('dotenv').config();
const { ethers } = require('ethers');
// Infura provider
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/2a1cd244c097446ea9b9db48fff11b05');
// Your wallet private key
const wallet = new ethers.Wallet('c61fd0f0ea34a5d750dd90dac8285f32b535931a3166f896d7b768336568a2ef', provider);
// Contract ABI and Address
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "arg",
                "type": "uint256"
            }
        ],
        "name": "SetBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = '0x5a75fA57b8f2d21a2e88a4459aA299E30406d484'; // Update with the new contract address if chang
// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
module.exports={
    contract
}
// Example function to read from the contract
// async function readData() {
//     try {
//         const data = await contract.Balance();
//         console.log('Contract Data:', data.toString());
//     } catch (error) {
//         console.error('Error reading from contract:', error);
//     }
// }

// // Example function to write to the contract
// async function setBalance(newBalance) {
//     try {
//         const tx = await contract.SetBalance(newBalance);
//         await tx.wait(); // Wait for the transaction to be mined
//         console.log('Transaction Hash:', tx.hash);
//     } catch (error) {
//         console.error('Error writing to contract:', error);
//     }
// }

// Interact with the contract
// setBalance(45)

 // Read and display the updated balance