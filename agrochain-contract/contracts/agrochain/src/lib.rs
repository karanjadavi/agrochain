#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, String};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Batch(u64),
    BatchCount,
}

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum BatchStatus {
    Listed,
    Funded,
    Delivered,
    Completed,
}

#[contracttype]
#[derive(Clone)]
pub struct GrainBatch {
    pub id: u64,
    pub farmer: Address,
    pub buyer: Address,
    pub verifier: Address,
    pub crop: String,
    pub quantity_kg: u64,
    pub price_xlm: i128,
    pub status: BatchStatus,
}

#[contract]
pub struct AgroChainContract;

#[contractimpl]
impl AgroChainContract {
    pub fn list_batch(
        env: Env,
        farmer: Address,
        buyer: Address,
        verifier: Address,
        crop: String,
        quantity_kg: u64,
        price_xlm: i128,
    ) -> u64 {
        farmer.require_auth();
        let count: u64 = env.storage().instance().get(&DataKey::BatchCount).unwrap_or(0);
        let id = count + 1;
        let batch = GrainBatch {
            id,
            farmer,
            buyer,
            verifier,
            crop,
            quantity_kg,
            price_xlm,
            status: BatchStatus::Listed,
        };
        env.storage().instance().set(&DataKey::Batch(id), &batch);
        env.storage().instance().set(&DataKey::BatchCount, &id);
        id
    }

    pub fn deposit_escrow(env: Env, batch_id: u64, buyer: Address, token_address: Address) {
        buyer.require_auth();
        let mut batch: GrainBatch = env.storage().instance().get(&DataKey::Batch(batch_id)).unwrap();
        assert!(batch.status == BatchStatus::Listed, "Batch not available");
        assert!(batch.buyer == buyer, "Not the assigned buyer");
        let token = token::Client::new(&env, &token_address);
        token.transfer(&buyer, &env.current_contract_address(), &batch.price_xlm);
        batch.status = BatchStatus::Funded;
        env.storage().instance().set(&DataKey::Batch(batch_id), &batch);
    }

    pub fn confirm_delivery(env: Env, batch_id: u64, verifier: Address) {
        verifier.require_auth();
        let mut batch: GrainBatch = env.storage().instance().get(&DataKey::Batch(batch_id)).unwrap();
        assert!(batch.status == BatchStatus::Funded, "Batch not funded");
        assert!(batch.verifier == verifier, "Not the assigned verifier");
        batch.status = BatchStatus::Delivered;
        env.storage().instance().set(&DataKey::Batch(batch_id), &batch);
    }

    pub fn release_funds(env: Env, batch_id: u64, token_address: Address) {
        let mut batch: GrainBatch = env.storage().instance().get(&DataKey::Batch(batch_id)).unwrap();
        assert!(batch.status == BatchStatus::Delivered, "Delivery not confirmed");
        let token = token::Client::new(&env, &token_address);
        token.transfer(&env.current_contract_address(), &batch.farmer, &batch.price_xlm);
        batch.status = BatchStatus::Completed;
        env.storage().instance().set(&DataKey::Batch(batch_id), &batch);
    }

    pub fn get_batch(env: Env, batch_id: u64) -> GrainBatch {
        env.storage().instance().get(&DataKey::Batch(batch_id)).unwrap()
    }
}
