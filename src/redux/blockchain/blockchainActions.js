// constants
import Web3 from "web3";
import TruffleFactory from "../../contracts/TruffleFactory.json";
// log
import { fetchData } from "../data/dataActions";

// thêm hành động
const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return { 
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => { 
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      
      try {
        await window.ethereum.enable(); 

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        console.log("Account: " , accounts[0])

        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        
        console.log("NetworkID: ",networkId);

        // const truffleFactoryNetworkData = await TruffleFactory.networks[networkId];

        if (networkId === "97") {
          const truffleFactory = new web3.eth.Contract(
            TruffleFactory.abi,
            '0x67A174b957dAc79fa566bE3B3C0dfc1F4213d729'
          );
          dispatch( 
            connectSuccess({
              account: accounts[0],
              truffleFactory: truffleFactory,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to bsc testnet."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};