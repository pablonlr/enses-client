import React from 'react'
import { Row, Card, Col, Avatar, Typography, Popover, Descriptions,Tag, Divider, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import {useParams} from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
import { useCategoriesForLabelQuery } from '../../services/wordsInSpanish';

const { Paragraph } = Typography;
const { CheckableTag } = Tag;
const { Link } = Typography;




function Itemdetail(props) {
  const {domainName} = useParams()
  const imgSrc = "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0xbdf858ae6a08cd0e8ca117b778afbb4c3c8c051fbc80c3eee46273786a197a4a/image"
  const title = domainName
  const {data: categories} = useCategoriesForLabelQuery(domainName.substring(0,domainName.length-4))

  console.log(categories)

  const queryString = gql`
{
  registrations(first: 1, where: {domain_:{ name: "${domainName}" }}) {
            expiryDate
            registrationDate
            registrant {
              id
            }
            domain{
              id
              createdAt
              labelName
              labelhash
              owner {
                id
              }
            }
          }
}
`;

  const { data, loading, error } = useQuery(queryString);
  if (loading) return "Cargando datos...";
  if (error) return <pre>{error.message}</pre>
  let registration
  if (data?.registrations?.length < 1) {
      return "No se encontraron datos asociados a este dominio"
  }
  const registrations =  data?.registrations[0]

 
  const creationDate = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(registrations.domain.createdAt*1000)
  const registrationDate = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(registrations?.registrationDate*1000)
  const expireDate = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(registrations?.expiryDate*1000)
  return (
    <Row style={{
      backgroundColor: "white",
      overflow: "hidden"
    }}>
    <Col xs={24} xl={8}>
    <Card
      hoverable={true}
      style={{
        maxWidth: 430,
        margin: 30,
        marginTop: 50,
        borderRadius: "30px",
        overflow: "hidden"
      }}
      cover={
        <img
        alt="example"
        src={`https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/${registrations.domain?.labelhash}/image`}
        />
      }
    
    >
      
   </Card>
    </Col>
    <Col xs={24} xl={8}>
  <div style={{margin: 20, marginTop:40}}>
    <Descriptions
      title={<Typography.Title level={5} >Detalles del Dominio:</Typography.Title>}
      bordered
      column={{
        xxl: 1,
        xl: 1,
        lg: 1,
        md: 1,
        sm: 1,
        xs: 1,
      }}
      size="small"
      
    >
      <Descriptions.Item  label="Label:"> <Paragraph copyable>{registrations.domain?.labelName}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="ID:"><Paragraph copyable>{registrations?.domain?.id}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Label Hash:"><Paragraph copyable>{registrations.domain?.labelhash}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Creación:"><Paragraph>{creationDate}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Registro:"><Paragraph>{registrationDate}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Vencimiento:"><Paragraph>{expireDate}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Propietario:"><Paragraph copyable>{registrations?.registrant?.id}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Controller:"><Paragraph copyable>{registrations?.domain?.owner?.id}</Paragraph></Descriptions.Item>
      <Descriptions.Item>
    <div><Link href={`https://app.ens.domains/name/${domainName}/details`} target="_blank"> Ver en ENSDomains ⬀</Link></div>
    </Descriptions.Item>
    </Descriptions>
    
  </div>
    </Col>
    <Col xs={24} xl={8}>
    <Divider style={{ marginTop: 40, marginBottom: 40}} orientation="left"><Typography.Title level={5}>Categorías: </Typography.Title>
    <div>
      {categories?.map((category) => {
        if (category === "null") {
          return
        }
          return <Tag key={category} color="#55a0f2">{category}</Tag>
      })}
      <CheckableTag> Añadir categoría</CheckableTag>
    </div>
    </Divider>
    
    </Col>
  </Row>
    
  )
}

export default Itemdetail