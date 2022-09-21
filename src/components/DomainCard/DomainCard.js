import React, {useState} from 'react'
import { Row, Card, Avatar, Skeleton} from 'antd';
import Meta from 'antd/lib/card/Meta';

function DomainCard(props) {
    //const [didLoad, setLoad] = useState(false);
    const imgSRC = props.ImgSrc
    const style = props.style
  return (
   
    <Card
      hoverable={true}
      style={style}
      cover={
        <img style={style} src={imgSRC} ></img>
      }
    
    >
     
   </Card>
  )
}

export default DomainCard