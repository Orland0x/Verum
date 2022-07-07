import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { chains, wagmiClient } from '../utils/connectWallet';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { NetworkContext } from '../context/networkContext';
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {
  const [network, setNetwork] = useState({});

  useEffect(() => {
    if (typeof window == undefined) return;
    if (Object.keys(network).length != 0) {
      localStorage.setItem('network', JSON.stringify(network))
    } else {
      const savedNetwork = localStorage.getItem('network')
      if (savedNetwork != null && Object.keys(savedNetwork).length != 0) {
        setNetwork(JSON.parse(savedNetwork));
      }
    }
  }, [network])

  return (
    <NetworkContext.Provider value={{network, setNetwork}}>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
    </NetworkContext.Provider>
  )
}

export default MyApp
