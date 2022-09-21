import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import ConnectedUser from '../ConnectedUser/ConnectedUser'
import { Button } from 'antd';

function WagmiProfile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <>
        <ConnectedUser logoutFunction={disconnect} userAddr={address}/>
        
      </>
    )
  return <>
    <Button  type="primary" onClick={() => connect()}>Connect Wallet</Button>
  </>
}

export default WagmiProfile