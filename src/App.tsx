import {FC} from 'react';
import './App.css';
import {getChainName, isTestChain, useEtherBalance, useEthers, useNotifications} from '@usedapp/core';
import {formatEther} from '@ethersproject/units';
import mmLogo from './assets/icons/metamask.png';

const App: FC<{}> = () => {
  const {activateBrowserWallet, deactivate, account, chainId} = useEthers();
  const etherBalance = useEtherBalance(account);
  const {notifications} = useNotifications();

  console.log({notifications, chainId});

  const onError = (error: Error) => {
    console.error(error.message);
  };

  return (
    <div className="container">
      <div className="centerText">
        {!account && (
          <button className="Btn bold rowContainer" onClick={() => activateBrowserWallet(onError)}>
            Connect to MetaMask
            <img className="logo" src={mmLogo} alt="MetaMask" />
          </button>
        )}
        {account && (
          <>
            <button className="Btn bold" onClick={() => deactivate()}>
              Disconnect Wallet
            </button>
            <p>
              <span className="bold">Account: </span>
              {`${account.slice(0, 4)}...${account.slice(-4)}`}
            </p>
          </>
        )}
        {etherBalance && (
          <p>
            <span className="bold">Balance: </span>Ξ{formatEther(etherBalance)}
          </p>
        )}
      </div>
      <div className="separator"></div>
      {chainId && (
        <p>
          <span className="bold">Current network: </span>
          {getChainName(chainId)} {isTestChain(chainId) ? <label>(test)</label> : null}
        </p>
      )}
    </div>
  );
};

export default App;
