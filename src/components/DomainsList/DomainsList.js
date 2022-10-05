import React, {useState, useEffect} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import { skipToken } from "@reduxjs/toolkit/query"
//import {useWordsInSpanishFromArrayQuery} from "../../services/wordsInSpanish"
import { useEnsName, useEnsAvatar } from 'wagmi'
import { useLazyQuery, gql } from "@apollo/client";
import { Row, Card, Col, Avatar, Typography, Popover } from 'antd';
import Meta from 'antd/lib/card/Meta';
import SvgComponent from "./DomainAvatar"
import { useWordsInSpanishFromArrayQuery, useCategoriesFromArrayQuery } from '../../services/wordsInSpanish';
import { useAccount } from 'wagmi'
import CategoryTags from '../CategoryTags/CategoryTags';
const { Paragraph } = Typography;








function DomainsList() {
    const { isConnecting, isDisconnected } = useAccount()
    const address = "0xA7aE820d9442366930BC79a809Feaa132aD8ABD8"
    const [domainsENS, setDomainsENS] = useState([]);
    const [arrOfAddr, setArrOfAddr] = useState(skipToken);
    const tokensQuery = gql`
    {
     registrations(first: 1000, where: { registrant: "${address?.toLowerCase()}" }) {
       expiryDate
       registrationDate
       domain{
         id
         name
         createdAt
         labelName
         labelhash
       }
     }
   }
   `

    const [query, { data}] = useLazyQuery(tokensQuery)
    useEffect(() => {
      if (address?.length < 1)  {
        return
      }
      (async () => {
        await query()
      })();
      setDomainsENS(data?.registrations)
    }, [address, data])
    /*
    useEffect(() => {

        const getDomainsENS = async () => {
    
          
          const tokensQuery = `
            query {
              domains(where: {resolvedAddress_: {id: "${address.toLowerCase()}"}} first:500) {
                id
                name
                labelName
                labelhash
                createdAt
                resolvedAddress {
                  id
                }
              }
            }`;
    
            
          const client = new ApolloClient({
            uri: APIURL,
            cache: new InMemoryCache(),
          })
    
          client
            .query({
              query: gql(tokensQuery),
            })
            .then((data) => {
              setDomainsENS(data.data.registrations);
            })
            .catch((err) => {
              console.log('Error fetching data: ', err)
            })
        }
    
        if (address) {
          getDomainsENS();
        }
    
      }, [address]);
      */
      useEffect(() => {
        if (domainsENS && domainsENS?.length>1) {
          setArrOfAddr(domainsENS?.map(a=> a?.domain?.labelName))
        }
      }, [domainsENS])
        
        const {data: spanishWords, isLoading} =  useWordsInSpanishFromArrayQuery(arrOfAddr)


        const {data: categories} = useCategoriesFromArrayQuery(arrOfAddr)
        console.log(categories)
      if (isConnecting) {
        return <div>Conectando billetera...</div>
      }
      if (isDisconnected) {
        return <div>Conecte su billetera al sitio para visualizar los dominios</div>
      }
      if (domainsENS?.length == 0) {
        return <div>No existen dominios asociados a su dirección</div>
      }
        return (

        <>
        <div style={{"marginTop":40,"marginLeft":40, "marginRight":40, "marginBottom":40} }> 
            <Typography.Title level={1} style={{textAlign: "center"}}> Mis dominios:</Typography.Title>
            <Row gutter={[24,24]} className="domains-container">
                {domainsENS?.map((registration)=> {
                  const domain = registration?.domain
                    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(domain.createdAt*1000)
                return (
                    <Col xs={24} sm={12} xl={6} lg={4} className="domain-card" key={domain.name}>
                      <Link to={`domain/${domain.name}`}>
                      <Popover placement="bottom" title={ <Typography.Title level={5}>{domain.name}</Typography.Title>} content={
                        <>
                        <Paragraph copyable={{ text: domain.id }}>ID: {domain.id}</Paragraph>
                        <Paragraph copyable={{ text: domain.labelhash }}>Label Hash: {domain.labelhash}</Paragraph>
                        <div><Typography.Link href={`domain/${domain.name}`} target="_blank"> Más detalles</Typography.Link></div>
                        </>

                      }>
                      <Card
                          hoverable={true}
                          style={{
                          maxWidth: 300,
                          margin: "10px",
                          borderRadius: "30px",
                          overflow: "hidden"
                          }}
                          cover={
                            <img
                              alt="example"
                              src={`https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/${domain.labelhash}/image`}
                            />
                          }
                        >
                         <Meta style={{marginBottom: 8}} title={(spanishWords?.includes(domain.labelName)  ) ? "🔵 En Español": " " }/>
                         {categories && (domain.labelName in categories) && <><CategoryTags  categories={categories[domain.labelName].Categories}> </CategoryTags></>}
                        </Card>

                      </Popover>
                      </Link>
                        
                    </Col>
                )
                })}  
             </Row>

        </div>
        </>
        
        
        
        
        )
      
    
    
    
    
    }

    /*
    const { data, isError, isLoading } = useEnsAvatar({
        addressOrName: 'nick.eth',
        chainId: 1,
      })
```*/
      
    
    
    //const {data,isFetching} = useWordsInSpanishFromArrayQuery(words);


export default DomainsList