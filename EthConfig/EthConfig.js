require('dotenv').config();
const { ethers } = require('ethers');
// Infura provider
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/2a1cd244c097446ea9b9db48fff11b05');
// Your wallet private key
const wallet = new ethers.Wallet('c61fd0f0ea34a5d750dd90dac8285f32b535931a3166f896d7b768336568a2ef', provider);
// Contract ABI and Address
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dealId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isUser1",
                "type": "bool"
            }
        ],
        "name": "AgreementMade",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dealId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user1",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user2",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "DealCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dealId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum Dealing.Status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "name": "DealStatusUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dealId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "user1",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "user2",
                "type": "address"
            }
        ],
        "name": "DealsClosed",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "Deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "DepositMade",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_Amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_User1",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_User2",
                "type": "address"
            }
        ],
        "name": "NewDeal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dealId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isUser1",
                "type": "bool"
            }
        ],
        "name": "SatisfactionMarked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_Id",
                "type": "uint256"
            }
        ],
        "name": "User1Agree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_Id",
                "type": "uint256"
            }
        ],
        "name": "User1Satisfy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_Id",
                "type": "uint256"
            }
        ],
        "name": "User2Agree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_Id",
                "type": "uint256"
            }
        ],
        "name": "User2Satisfy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "Amount",
                "type": "uint256"
            }
        ],
        "name": "Withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "WithdrawalMade",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "Balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "LockAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "NewDeals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "Id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "Amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "User1",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "User2",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "User1Agree",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "User2Agree",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "User1Done",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "User2Done",
                "type": "bool"
            },
            {
                "internalType": "enum Dealing.Status",
                "name": "dealStatus",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextDealId",
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

const contractAddress = '0xA5EA73A45f69eC88c1Db4F4aCA073F7Cd8C2F13a'; // Update with the new contract address if chang
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