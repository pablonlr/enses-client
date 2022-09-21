import React from 'react'
import { Avatar, Card, Skeleton, Switch, Typography } from 'antd';
import { LogoutOutlined} from '@ant-design/icons'
import { useEnsName, useEnsAvatar } from 'wagmi'

import { useBalance } from 'wagmi'
const { Meta } = Card;


const { Paragraph } = Typography;

function ConnectedUser(props) {
  
  const userAddr = "0xA7aE820d9442366930BC79a809Feaa132aD8ABD8"
  const logoutFunc = props.logoutFunction
  const { data, isError, isLoading, isFetching, isSuccess } = useEnsName({
    address: userAddr,
  })
  let name = null;
  if (isLoading) {
    name = "loading alias..."
  } else if (!isError) {
    name = data
  }

  /*
  const avatar = useEnsAvatar({
    addressOrName: "piscosour.eth",
    enabled:false,
})
//console.log(avatar)
*/

  return (
    <div>
      <Card
      style={{
        width: 300,
        marginTop: 16,
        position: 'right',
      }}
      actions={[
        <LogoutOutlined key="logout" onClick={logoutFunc}/>,
      ]}
      size="small"
      >

        <Meta
        avatar={<Avatar src="https://cryptologos.cc/logos/ethereum-name-service-ens-logo.png"/>}
        title={name}
        description={userAddr}
        />
        
      </Card>
      
    </div>
  )
}

export default ConnectedUser