#!/bin/bash
RUSTFLAGS='-C link-arg=-s --cfg near_env="testnet"' cargo build --target wasm32-unknown-unknown --release
cp ./target/wasm32-unknown-unknown/release/promptwars.wasm build/
cp ./target/wasm32-unknown-unknown/release/promptwars.wasm ../market-factory/res
