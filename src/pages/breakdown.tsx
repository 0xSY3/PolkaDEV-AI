import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ClarityBreakdown() {
  let { clarityAddress } = useParams();
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dummytext = `Overview:

This smart contract serves as a bridge between different blockchain networks, allowing users to transfer assets between them. It includes functionality for registering users, transferring assets to and from the bridge, managing whitelists for users and launchpads, and validating orders through signatures.

Public Functions:

register-user:

- Purpose: Registers a user with the bridge.
- Functionality: Registers the provided user with the bridge contract if the contract is not paused and the user is either not required to be whitelisted or is whitelisted.
- Interaction: Users can call this function to register themselves with the bridge contract.

register-user-many:

- Purpose: Registers multiple users with the bridge.
- Functionality: Registers multiple users with the bridge contract simultaneously by calling the register-user function for each user in the provided list.
- Interaction: Similar to register-user, but for registering multiple users at once.

transfer-to-unwrap:

- Purpose: Transfers assets from an external chain to the bridge for unwrapping.
- Functionality: Transfers assets from an external chain to the bridge contract for unwrapping, deducting fees if applicable, and updating the reserve.
- Interaction: External systems can call this function to transfer assets to the bridge for unwrapping.

create-wrap-order, decode-wrap-order, hash-wrap-order:

- Purpose: Utility functions for handling wrap orders.
- Functionality: These functions are read-only and provide utility for creating, decoding, and hashing wrap orders.

create-launchpad-order, decode-launchpad-order, hash-launchpad-order:

- Purpose: Utility functions for handling launchpad orders.
- Functionality: Similar to the wrap order functions, but for handling launchpad orders.

set-use-launch-whitelist, set-launch-whitelisted:


- Purpose: Manage launchpad whitelists.
- Functionality: Allows the contract owner to enable or disable launchpad whitelists, and set whitelisted status for specific launchpad orders.
- Interaction: Only the contract owner can call these functions to manage launchpad whitelists.

set-paused, apply-whitelist, whitelist, whitelist-many, set-contract-owner:

- Purpose: Various administrative functions.
- Functionality: Allows the contract owner to pause the contract, apply user whitelists, whitelist individual users, set contract owner, etc.
- Interaction: These functions are used for administrative purposes and can only be called by the contract owner.

Security Considerations and Optimizations:

- Security: The contract ensures that certain actions can only be performed by the contract owner, and it checks for paused status before executing critical functions to prevent unauthorized actions. Signature validation ensures the integrity of orders.
- Optimizations: Some functions could potentially be optimized for gas efficiency, such as reducing storage reads and writes where possible- .

Data Management and Storage:

- The contract stores data such as contract owner, paused status, whitelisted users, launchpad whitelists, order hashes, etc., using various data structures like variables, maps, and constants.
- Data is managed and accessed primarily through public and private functions, ensuring proper access control and integrit- y.

Contract Interaction and Design Patterns:

- Users interact with the contract primarily through public functions, which enforce various checks and validations.
- Design patterns like access control, state management, and error handling are employed throughout the contract to ensure security and reliability.
- The contract follows a modular design, separating functionality into different functions for clarity and reusability.

  `

  const dummyCode = `
  (impl-trait .trait-ownable.ownable-trait)
  (use-trait ft-trait .trait-sip-010.sip-010-trait)
  (define-constant ERR-NOT-AUTHORIZED (err u1000))
  (define-constant ERR-TOKEN-NOT-AUTHORIZED (err u1001))
  (define-constant ERR-UNKNOWN-USER-ID (err u1005))
  (define-constant ERR-UNKNOWN-VALIDATOR-ID (err u1006))
  (define-constant ERR-USER-ALREADY-REGISTERED (err u1007))
  (define-constant ERR-VALIDATOR-ALREADY-REGISTERED (err u1008))
  (define-constant ERR-DUPLICATE-SIGNATURE (err u1009))
  (define-constant ERR-ORDER-HASH-MISMATCH (err u1010))
  (define-constant ERR-INVALID-SIGNATURE (err u1011))
  (define-constant ERR-UKNOWN-RELAYER (err u1012))
  (define-constant ERR-REQUIRED-VALIDATORS (err u1013))
  (define-constant ERR-ORDER-ALREADY-SENT (err u1014))
  (define-constant ERR-PAUSED (err u1015))
  (define-constant ERR-USER-NOT-WHITELISTED (err u1016))
  (define-constant ERR-AMOUNT-LESS-THAN-MIN-FEE (err u1017))
  (define-constant ERR-INVALID-AMOUNT (err u1019))
  (define-constant ERR-INVALID-INPUT (err u1020))
  (define-constant ERR-NOT-IN-WHITELIST (err u1021))
  (define-constant MAX_UINT u340282366920938463463374607431768211455)
  (define-constant ONE_8 u100000000)
  (define-constant structured-data-prefix 0x534950303138)
  (define-constant message-domain-main 0x57790ebb55cb7aa3d0ffb493faf4fa3a8513cc07323280dac9f19a442bc81809) ;;mainnet
  (define-constant message-domain-test 0xbba6c42cb177438f5dc4c3c1c51b9e2eb0d43e6bdec927433edd123888f4ce6b) ;; testnet
  (define-data-var contract-owner principal tx-sender)
  (define-data-var is-paused bool true)
  (define-data-var use-whitelist bool false)
  (define-map whitelisted-users principal bool)
  (define-map use-launch-whitelist uint bool)
  (define-map launch-whitelisted {launch-id: uint, owner: (buff 20)} bool)
  (define-data-var order-hash-to-iter (buff 32) 0x)
  (define-public (register-user (user principal))
    (begin
      (asserts! (not (get-paused)) ERR-PAUSED)
      (asserts! (or (not (get-use-whitelist)) (is-whitelisted user)) ERR-USER-NOT-WHITELISTED)
      (contract-call? .cross-bridge-registry-v1-03 register-user user)))
  (define-public (register-user-many (users (list 1000 principal)))
      (ok (map register-user users)))
  (define-public (transfer-to-unwrap (token-trait <ft-trait>) (amount-in-fixed uint) (the-chain-id uint) (settle-address (buff 256)))
    (let (
        (sender tx-sender)
        (token (contract-of token-trait))
        (chain-details (try! (get-approved-chain-or-fail the-chain-id)))
        (token-id (try! (get-approved-token-id-or-fail token)))
        (token-details (try! (get-approved-token-or-fail token)))
        (fee (max (mul-down amount-in-fixed (get fee token-details)) (get-min-fee-or-default token-id the-chain-id)))
        (net-amount (- amount-in-fixed fee))
        (user-id (match (get-user-id tx-sender) user-id user-id (try! (register-user tx-sender)))))
      (asserts! (not (get-paused)) ERR-PAUSED)
      (asserts! (or (not (get-use-whitelist)) (is-whitelisted tx-sender)) ERR-USER-NOT-WHITELISTED)
      (asserts!
        (and
          (>= amount-in-fixed (get min-amount token-details))
          (<= amount-in-fixed (get max-amount token-details))
          (<= amount-in-fixed (get-token-reserve-or-default token-id the-chain-id))
        )
      ERR-INVALID-AMOUNT)
      (asserts! (> amount-in-fixed (get-min-fee-or-default token-id the-chain-id)) ERR-AMOUNT-LESS-THAN-MIN-FEE)
      (if (get burnable token-details)
        (begin
          (as-contract (try! (contract-call? token-trait burn-fixed net-amount sender)))
          (and (> fee u0) (try! (contract-call? token-trait transfer-fixed fee tx-sender .cross-bridge-registry-v1-03 none)))
        )
        (try! (contract-call? token-trait transfer-fixed amount-in-fixed tx-sender .cross-bridge-registry-v1-03 none))
      )
      (as-contract (try! (contract-call? .cross-bridge-registry-v1-03 add-accrued-fee token-id fee)))
      (as-contract (try! (contract-call? .cross-bridge-registry-v1-03 set-token-reserve { token-id: token-id, chain-id: the-chain-id } (- (get-token-reserve-or-default token-id the-chain-id) amount-in-fixed))))
      (print {
        object: "cross-bridge-endpoint",
        action: "transfer-to-unwrap",
        user-id: user-id,
        chain: (get name chain-details),
        net-amount: net-amount,
        fee-amount: fee,
        settle-address:
        (default-to 0x (slice? settle-address u0 (get buff-length chain-details))),
        token-id: token-id
      })
      (ok true)
    )
  )
  (define-read-only (create-wrap-order (order { to: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) } ))
    (ok (unwrap! (to-consensus-buff? order) ERR-INVALID-INPUT)))
  (define-read-only (decode-wrap-order (order-buff (buff 128)))
    (ok (unwrap! (from-consensus-buff? { to: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) } order-buff) ERR-INVALID-INPUT)))
  (define-read-only (hash-wrap-order (order { to: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) } ))
    (ok (sha256 (try! (create-wrap-order order)))))
  (define-read-only (create-launchpad-order (order { from: (buff 20), to: uint, launch-id: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) } ))
    (ok (unwrap! (to-consensus-buff? order) ERR-INVALID-INPUT)))
  (define-read-only (decode-launchpad-order (order-buff (buff 128)))
    (ok (unwrap! (from-consensus-buff? { from: (buff 20), to: uint, launch-id: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) } order-buff) ERR-INVALID-INPUT)))
  (define-read-only (hash-launchpad-order (order { from: (buff 20), to: uint, launch-id: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) } ))
    (ok (sha256 (try! (create-launchpad-order order)))))
  (define-read-only (message-domain)
    (if (is-eq chain-id u1) message-domain-main message-domain-test))
  (define-read-only (get-use-whitelist)
    (var-get use-whitelist))
  (define-read-only (is-whitelisted (user principal))
    (default-to false (map-get? whitelisted-users user)))
  (define-read-only (get-paused)
    (var-get is-paused))
  (define-read-only (get-contract-owner)
    (ok (var-get contract-owner)))
  (define-read-only (is-approved-operator-or-default (operator principal))
    (contract-call? .cross-bridge-registry-v1-03 is-approved-operator-or-default operator))
  (define-read-only (is-approved-relayer-or-default (relayer principal))
    (contract-call? .cross-bridge-registry-v1-03 is-approved-relayer-or-default relayer))
  (define-read-only (get-user-id (user principal))
    (contract-call? .cross-bridge-registry-v1-03 get-user-id user))
  (define-read-only (get-user-id-or-fail (user principal))
    (contract-call? .cross-bridge-registry-v1-03 get-user-id-or-fail user))
  (define-read-only (user-from-id (id uint))
    (contract-call? .cross-bridge-registry-v1-03 user-from-id id))
  (define-read-only (user-from-id-or-fail (id uint))
    (contract-call? .cross-bridge-registry-v1-03 user-from-id-or-fail id))
  (define-read-only (get-validator-id (validator principal))
    (contract-call? .cross-bridge-registry-v1-03 get-validator-id validator))
  (define-read-only (get-validator-id-or-fail (validator principal))
    (contract-call? .cross-bridge-registry-v1-03 get-validator-id-or-fail validator))
  (define-read-only (validator-from-id (id uint))
    (contract-call? .cross-bridge-registry-v1-03 validator-from-id id))
  (define-read-only (validator-from-id-or-fail (id uint))
    (contract-call? .cross-bridge-registry-v1-03 validator-from-id-or-fail id))
  (define-read-only (get-required-validators)
    (contract-call? .cross-bridge-registry-v1-03 get-required-validators))
  (define-read-only (get-approved-chain-or-fail (the-chain-id uint))
    (contract-call? .cross-bridge-registry-v1-03 get-approved-chain-or-fail the-chain-id))
  (define-read-only (get-token-reserve-or-default (the-token-id uint) (the-chain-id uint))
    (contract-call? .cross-bridge-registry-v1-03 get-token-reserve-or-default the-token-id the-chain-id))
  (define-read-only (get-min-fee-or-default (the-token-id uint) (the-chain-id uint))
    (contract-call? .cross-bridge-registry-v1-03 get-min-fee-or-default the-token-id the-chain-id))
  (define-read-only (get-approved-token-id-or-fail (token principal))
    (contract-call? .cross-bridge-registry-v1-03 get-approved-token-id-or-fail token))
  (define-read-only (get-approved-token-by-id-or-fail (token-id uint))
    (contract-call? .cross-bridge-registry-v1-03 get-approved-token-by-id-or-fail token-id))
  (define-read-only (get-approved-token-or-fail (token principal))
    (contract-call? .cross-bridge-registry-v1-03 get-approved-token-or-fail token))
  (define-read-only (check-is-approved-token (token principal))
    (contract-call? .cross-bridge-registry-v1-03 check-is-approved-token token))
  (define-read-only (is-order-sent-or-default (order-hash (buff 32)))
    (contract-call? .cross-bridge-registry-v1-03 is-order-sent-or-default order-hash))
  (define-read-only (is-order-validated-by-or-default (order-hash (buff 32)) (validator principal))
    (contract-call? .cross-bridge-registry-v1-03 is-order-validated-by-or-default order-hash validator))
  (define-read-only (get-use-launch-whitelist-or-default (launch-id uint))
    (default-to false (map-get? use-launch-whitelist launch-id)))
  (define-read-only (get-launch-whitelisted-or-default (launch-id uint) (owner (buff 20)))
    (if (get-use-launch-whitelist-or-default launch-id)
      (default-to false (map-get? launch-whitelisted {launch-id: launch-id, owner: owner}))
      true))
  (define-read-only (validate-launchpad (launch-id uint) (from (buff 20)) (to principal) (amount uint) (token principal))
    (begin
      (asserts! (get-launch-whitelisted-or-default launch-id from) ERR-NOT-IN-WHITELIST)
      (contract-call? .alex-launchpad-v1-7 validate-register to launch-id amount token)))
  (define-public (set-use-launch-whitelist (launch-id uint) (new-whitelisted bool))
    (begin
      (try! (check-is-owner))
      (ok (map-set use-launch-whitelist launch-id new-whitelisted))))
  (define-public (set-launch-whitelisted (launch-id uint) (whitelisted (list 200 {owner: (buff 20), whitelisted: bool})))
    (begin
      (try! (check-is-owner))
      (fold set-launch-whitelisted-iter whitelisted launch-id)
      (ok true)))
  (define-public (set-paused (paused bool))
    (begin
      (try! (check-is-owner))
      (ok (var-set is-paused paused))))
  (define-public (apply-whitelist (new-use-whitelist bool))
    (begin
      (try! (check-is-owner))
      (ok (var-set use-whitelist new-use-whitelist))))
  (define-public (whitelist (user principal) (whitelisted bool))
    (begin
      (try! (check-is-owner))
      (ok (map-set whitelisted-users user whitelisted))))
  (define-public (whitelist-many (users (list 2000 principal)) (whitelisted (list 2000 bool)))
    (ok (map whitelist users whitelisted)))
  (define-public (set-contract-owner (owner principal))
    (begin
      (try! (check-is-owner))
      (ok (var-set contract-owner owner))))
  (define-public (transfer-to-wrap
      (order { to: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) })
      (token-trait <ft-trait>)
      (signature-packs (list 100 { signer: principal, order-hash: (buff 32), signature: (buff 65) })))
      (let (
          (token (contract-of token-trait))
          (order-hash (try! (hash-wrap-order order)))
          (common-data (try! (transfer-common order-hash (get to order) token (get chain-id order) signature-packs)))
          (token-details (get token-details common-data))
          (chain-details (get chain-details common-data))
          (recipient (get recipient common-data)))
        (asserts! (is-eq (try! (get-approved-token-id-or-fail token)) (get token order)) ERR-TOKEN-NOT-AUTHORIZED)
        (if (get burnable token-details)
          (as-contract (try! (contract-call? token-trait mint-fixed (get amount-in-fixed order) recipient)))
          (as-contract (try! (contract-call? .cross-bridge-registry-v1-03 transfer-fixed token-trait (get amount-in-fixed order) recipient))))
        (as-contract (try! (contract-call? .cross-bridge-registry-v1-03 set-token-reserve { token-id: (get token order), chain-id: (get chain-id order) } (+ (get-token-reserve-or-default (get token order) (get chain-id order)) (get amount-in-fixed order)))))
        (print {
          object: "cross-bridge-endpoint",
          action: "transfer-to-wrap",
          salt: (get salt order),
          principal: recipient,
          amount-in-fixed: (get amount-in-fixed order),
          token: (get token order),
          to: (get to order),
          chain-id: (get chain-id order)
        })
        (as-contract (contract-call? .cross-bridge-registry-v1-03 set-order-sent order-hash true))))
  (define-public (transfer-to-launchpad
      (order { from: (buff 20), to: uint, launch-id: uint, token: uint, amount-in-fixed: uint, chain-id: uint, salt: (buff 256) })
      (token-trait <ft-trait>)
      (signature-packs (list 100 { signer: principal, order-hash: (buff 32), signature: (buff 65)})))
      (let (
          (token (contract-of token-trait))
          (order-hash (try! (hash-launchpad-order order)))
          (common-data (try! (transfer-common order-hash (get to order) token (get chain-id order) signature-packs)))
          (token-details (get token-details common-data))
          (chain-details (get chain-details common-data))
          (recipient (get recipient common-data))
          (amount (get amount-in-fixed order)))
        (asserts! (is-eq (try! (get-approved-token-id-or-fail token)) (get token order)) ERR-TOKEN-NOT-AUTHORIZED)
        (and (get burnable token-details) (as-contract (try! (contract-call? token-trait mint-fixed amount (as-contract tx-sender)))))
        (as-contract (try! (contract-call? .cross-bridge-registry-v1-03 set-token-reserve { token-id: (get token order), chain-id: (get chain-id order) } (+ (get-token-reserve-or-default (get token order) (get chain-id order)) (get amount-in-fixed order)))))
        (print {
          object: "cross-bridge-endpoint",
          action: "transfer-to-launchpad",
          salt: (get salt order),
          from: (get from order),
          principal: recipient,
          launch-id: (get launch-id order),
          amount-in-fixed: (get amount-in-fixed order),
          token: (get token order),
          to: (get to order),
          chain-id: (get chain-id order)
        })
        (as-contract (try! (contract-call? .cross-bridge-registry-v1-03 set-order-sent order-hash true)))
        (if (is-ok (validate-launchpad (get launch-id order) (get from order) recipient amount token))
          (begin
            (as-contract (try! (contract-call? .alex-launchpad-v1-7 register-on-behalf recipient (get launch-id order) amount token-trait)))
            (ok (map-set launch-whitelisted { launch-id: (get launch-id order), owner: (get from order) } false)))
          (begin
            (as-contract (try! (contract-call? token-trait transfer-fixed amount tx-sender recipient none)))
            (ok false)))))
  (define-private (set-launch-whitelisted-iter (e {owner: (buff 20), whitelisted: bool}) (launch-id uint))
    (begin
      (map-set launch-whitelisted {launch-id: launch-id, owner: (get owner e)} (get whitelisted e))
      launch-id))
  (define-private (transfer-common (order-hash (buff 32)) (to uint) (token principal) (the-chain-id uint) (signature-packs (list 100 { signer: principal, order-hash: (buff 32), signature: (buff 65)})))
    (let (
        (token-details (try! (get-approved-token-or-fail token)))
        (chain-details (try! (get-approved-chain-or-fail the-chain-id)))
        (recipient (try! (user-from-id-or-fail to))))
      (asserts! (not (get-paused)) ERR-PAUSED)
      (asserts! (is-approved-relayer-or-default tx-sender) ERR-UKNOWN-RELAYER)
      (asserts! (>= (len signature-packs) (get-required-validators)) ERR-REQUIRED-VALIDATORS)
      (asserts! (not (is-order-sent-or-default order-hash)) ERR-ORDER-ALREADY-SENT)
      (var-set order-hash-to-iter order-hash)
      (try! (fold validate-signature-iter signature-packs (ok true)))
      (ok { token-details: token-details, chain-details: chain-details, recipient: recipient })))
  (define-private (validate-order (order-hash (buff 32)) (signature-pack { signer: principal, order-hash: (buff 32), signature: (buff 65)}))
    (let (
        (validator (try! (validator-from-id-or-fail (try! (get-validator-id-or-fail (get signer signature-pack)))))))
      (asserts! (not (is-order-validated-by-or-default order-hash (get signer signature-pack))) ERR-DUPLICATE-SIGNATURE)
      (asserts! (is-eq order-hash (get order-hash signature-pack)) ERR-ORDER-HASH-MISMATCH)
      (asserts! (is-eq (secp256k1-recover? (sha256 (concat structured-data-prefix (concat (message-domain) order-hash))) (get signature signature-pack)) (ok (get validator-pubkey validator))) ERR-INVALID-SIGNATURE)
      (as-contract (contract-call? .cross-bridge-registry-v1-03 set-order-validated-by { order-hash: order-hash, validator: (get signer signature-pack) } true))))
  (define-private (validate-signature-iter (signature-pack { signer: principal, order-hash: (buff 32), signature: (buff 65)}) (previous-response (response bool uint)))
    (match previous-response
      prev-ok
      (validate-order (var-get order-hash-to-iter) signature-pack)
      prev-err
      previous-response))
  (define-private (check-is-owner)
    (ok (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)))
  (define-private (mul-down (a uint) (b uint))
    (/ (* a b) ONE_8))
  (define-private (div-down (a uint) (b uint))
    (if (is-eq a u0) u0 (/ (* a ONE_8) b)))
  (define-private (max (a uint) (b uint))
    (if (<= a b) b a))
  `;

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.post("http://localhost:3001/clarify", {
          contractId: clarityAddress,
        });
        setExplanation(response.data.gptResponse.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
 }, []);

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
 }, []);

 return (
  <div>
    <div className="bg-black min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-custom text-center mb-8 text-teal-500">
          Clarity Smart Contract Address: {clarityAddress}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Clarity Smart Contract Code
            </h2>
            {isLoading ? (
              <p className="text-center">Loading Code...</p>
            ) : (
              <pre className="overflow-auto">
               {dummyCode}
              </pre>
            )}
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 w-full">Explanation</h2>
            {isLoading ? (
              <p className="text-center">Loading Explanation...</p>
            ) : (
              <p className="break-words w-full whitespace-pre-wrap">
               {dummytext}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ClarityBreakdown;
