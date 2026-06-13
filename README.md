# AgroChain

> Trustless grain escrow on Stellar Soroban — built in Kenya, for Africa.

## The problem

Farmers in Kenya deliver grain to buyers and wait weeks or months to get paid — or never get paid at all. There is no system to enforce payment, no middleman that both sides trust, and no paper trail that cannot be faked.

## The solution

AgroChain is a smart contract escrow system built on Stellar Soroban. A buyer locks funds on-chain before delivery. A trusted verifier confirms the grain arrived. The contract releases payment to the farmer automatically — no bank, no middleman, no way to cheat.

## How it works

1. Farmer lists a grain batch (crop type, quantity, price)
2. Buyer deposits funds into the smart contract escrow
3. Verifier (co-op, inspector) confirms delivery on-chain
4. Contract automatically releases funds to the farmer

## Smart contract functions

| Function | Description |
|---|---|
| `list_batch()` | Farmer lists grain with quantity and price |
| `deposit_escrow()` | Buyer locks funds in the contract |
| `confirm_delivery()` | Verifier signs off on delivery |
| `release_funds()` | Contract pays farmer automatically |

## Testnet deployment

- Network: Stellar Testnet
- Contract ID: `CDRDKI6MC2UB4VBTWW55AX76KHZP6BGQ46OQRJZGVW2G4X6ZGUUNQSYW`
- Explorer: https://stellar.expert/explorer/testnet/contract/CDRDKI6MC2UB4VBTWW55AX76KHZP6BGQ46OQRJZGVW2G4X6ZGUUNQSYW

## Tech stack

- Smart contract: Rust + Soroban SDK
- Blockchain: Stellar testnet
- Frontend: React + Vite (coming soon)
- Payment roadmap: M-Pesa KES offramp for farmers

## Roadmap

- [x] Smart contract written and tested
- [x] Deployed to Stellar testnet
- [ ] React frontend dashboard
- [ ] M-Pesa integration for farmer payouts
- [ ] ETHSafari Kenya 2026 submission

## Built by

[@karanjadavi](https://github.com/karanjadavi) — Nairobi, Kenya
