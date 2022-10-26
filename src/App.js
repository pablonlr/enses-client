import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import { getDefaultProvider } from 'ethers'
import {Layout, Typography, Space} from 'antd';

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
import { publicProvider } from 'wagmi/providers/public';import PendingTable from './components/PendingTable/PendingTable';
import SearchBarFiltered from './components/SearchBarFiltered/SearchBarFiltered';
import DomainsTable from './components/DomainsTable/DomainsTable';
import Navbar from './components/Navbar/Navbar';
import PopulateFrom from './components/PopulateForm/PopulateFrom';
import SimpleSearch from './components/SimpleSearch/SimpleSearch';
import ListDomains from './components/ListDomains/ListDomains';



import { ConfigProvider } from 'antd';
import GlobalFiltered from './components/GlobalFiltered/GlobalFiltered';
import BulkSearch from './components/BulkSearch/BulkSearch';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
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
        
        
        <div style={{float:"cene"}}>
        <Navbar></Navbar>
        </div>
        
        
     
        </Header>
        <Content
        style={{
          backgroundColor: "white",     
          overflow: "hidden",
          }}
        >
          
          <ApolloProvider client={apolloClient}>
          <Routes>
          <Route exact path="/" element={<DomainsList/>}></Route>
          <Route exact path="/filter/word" element={<SearchBarFiltered />}></Route>
          <Route exact path="/filter/global" element={<GlobalFiltered />}></Route>
          <Route exact path="/search/simple" element={<SimpleSearch />}></Route>
          <Route exact path="/search/bulk" element={<BulkSearch />}></Route>
          <Route exact path="/search/bulk/result" element={<DomainsTable />}></Route>
          <Route exact path="/filter/word/result" element={<DomainsTable />}></Route>
          <Route exact path="/filter/global/result" element={<DomainsTable />}></Route>
          <Route exact path="/domain/:domainName" element={<Itemdetail/>}></Route>
          <Route exact path="/category/" element={<ListDomains/>}></Route>
          <Route exact path="/moderate/category/pending" element={<PendingTable/>}></Route>
          <Route exact path="/moderate/category/populate" element={<PopulateFrom/>}></Route>
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
