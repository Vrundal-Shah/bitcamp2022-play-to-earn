import React from "react";
import { useEffect, useState } from "react";
import styles from "./MetamaskAuth.module.css";
import Profile from "./Profile";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

export default function MetaMaskAuth({ onAddressChanged, isAuthenticated }) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
    <div>
      <>Connected with</> <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  );
}

function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "http://localhost:3000/"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    );
  }

  return (
    <button className={styles.button} onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

function Address({ userAddress, isAuthenticated }) {
  return (
    <span className={styles.address}>
      {userAddress.substring(0, 5)}…
      {userAddress.substring(userAddress.length - 4)}
    </span>
  );
}
