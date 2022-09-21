import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import { getDefaultProvider } from 'ethers'
import {Layout, Typography, Space} from 'antd';
import Navbar from './components/Navbar/Navbar';
import './App.css'
import { Content, Header } from 'antd/lib/layout/layout';
import Itemdetail from "./components/ItemDetail/Itemdetail"
import DomainsList from './components/DomainsList/DomainsList';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import RainbowButton from "./components/RainbowButton/RainbowButton";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';;

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'ENS Español',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const apolloClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
  cache: new InMemoryCache()
});


function App() {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} modalSize="compact">
    <div className='app'>
      <Layout >
        <Header style={{
                          
                          overflow: "hidden"
                        
                          }}>
          <div className='logo'></div>
          <div className='navbar' >
        <div style={{float:"right", margin:10}}>
          <RainbowButton/>
        </div>
                          
        </div>
        </Header>
        <Content
        >
          
            <ApolloProvider client={apolloClient}>
          <Routes>
          <Route exact path="/" element={<DomainsList />}>
              
          </Route>
          <Route exact path="/domain/:domainName" element={<Itemdetail/>}>
          </Route>
          </Routes>
          </ApolloProvider>
          

          
        
        </Content>
      
      </Layout>
      
    </div>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
