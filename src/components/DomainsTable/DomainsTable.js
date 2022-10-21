import React, {useState, useEffect} from 'react'
import { json, Link, useLocation, useParams } from "react-router-dom";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { message, Table, Typography } from 'antd';
import { useCategoriesFromArrayQuery } from '../../services/wordsInSpanish';
import CategoryTags from '../CategoryTags/CategoryTags';


const columnsLocal = [
  {
    title: 'Labels',
    dataIndex: 'label',
    sorter: (a, b) => a.label.localeCompare(b.label),
    showSorterTooltip: false,
  },
  {
    title: 'Disponible',
    dataIndex: 'available',
    filters: [
      {
        text: 'Disponible',
        value: 'Si',
      },
      {
        text: 'No disponible',
        value: 'No',
      },
    ],
    onFilter: (value, record) => record.available === value,
    filterMultiple: false,
  },
  {
    title: 'Dominios',
    dataIndex: 'domain',
    sorter: (a, b) => a.domain.length - b.domain.length,
    showSorterTooltip: false,
  },
  {
    title: 'Categorías',
    dataIndex: 'category',
  },
  {
    title: 'Fecha de vencimiento',
    dataIndex: 'expiryDate',
    
  },
  {
    title: 'Fecha de registro',
    dataIndex: 'creationDate',
  },
];

const columnsGlobal = [
  {
    title: 'Labels',
    dataIndex: 'label',
    sorter: (a, b) => a.label.localeCompare(b.label),
    showSorterTooltip: false,
  },
  {
    title: 'Dominios',
    dataIndex: 'domain',
    sorter: (a, b) => a.domain.length - b.domain.length,
    showSorterTooltip: false,
  },
  {
    title: 'Fecha de vencimiento',
    dataIndex: 'expiryDate',
    
  },
  {
    title: 'Fecha de registro',
    dataIndex: 'creationDate',
  },
  {
    title: 'Categorías',
    dataIndex: 'category',
  },
];

const getQueryString = (arr) => {
  const st = JSON.stringify(arr)
  return gql`
query Registrations($payload: String!) {
  registrations(first: 1000, where: { labelName_in: $payload}) {
            expiryDate
            registrationDate
            labelName
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
}

function DomainsTable() {
    const { state } = useLocation();
   // const state = ["casa", "vida","accion", "desarrollo", "eth", "jgjjsgfhe", "loco", "loca", "amor", "amante", "amorio", "salir"]
    const {data: categories} = useCategoriesFromArrayQuery(state.labels)
    const [remaining, setRemaining] = useState([])
    const [payload, setPayload] = useState([])
    const [registrations, setRegistrations] = useState([])
    const queryString = gql`
    query Registrations($payload: [String!]) {
      registrations(first: 1000, where: { labelName_in: $payload}) {
                expiryDate
                registrationDate
                labelName
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

    useEffect(() => {
      const rema = state.labels.slice(0,state.labels.length)
      const firstK = rema.splice(0,1000)
      setPayload(firstK)
      
      setRemaining(rema)
      if (state.labels.length > 1000 && state.labels.length <5000 ) {
        message.loading("sea paciente, estamos cargando miles de resultados")
      }
      if (state.labels.length >= 5000 && state.labels.length <30000) {
        message.warn("la cantidad de resultados es muy grande. Puede demorar minutos")
      }
      if (state.labels.length >= 30000) {
        message.error("La cantidad de resultados")
      }
    }, [])

    
    
  //const payload = JSON.stringify(firstk)
  const { data, loading, error } = useQuery(queryString, {
    variables: { payload },
  });
  useEffect(() => {
    if(data) 
    {  
      if (remaining.length>0) {
      const rema = remaining.slice(0, remaining.length)
      const firstK = rema.splice(0,1000)
      setPayload(firstK)
      setRemaining(rema)
      const newRg = [...registrations,...data.registrations]
      setRegistrations(newRg)
      }
      
    }
  }, [data])
  if(data) {
    if (registrations.length < 1) {
      setRegistrations(data.registrations)
     return
   }
  }



  if (error) {
    console.log(error)
    return (
      <div>  Error</div>
    )
  }
  if (loading  || !categories || remaining.length > 0 || payload.length <1) {
    
    return (
      <div>loading...</div>
    )
    
  }

  

  

  
  const tableValues = [] 
   registrations.map((registration) => {
    if(registration?.labelName?.length >2)
    {
      
      tableValues.push(
        {
          key: registration?.labelName,
          label: registration?.labelName,
          available: "No",
          domain: <Link to={`/domain/${registration?.labelName}.eth`}>{`${registration?.labelName}.eth` }</Link>,
          category: <CategoryTags categories={categories[registration?.labelName]?.Categories}></CategoryTags>,
          creationDate: new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(registration?.registrationDate*1000),
          expiryDate: new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(registration?.expiryDate*1000)
        },
      ) 
    }
    
  })
  if (state.from === "local") {
    for (let i =0; i < state.labels.length; i++) {
      let breaked = false
      for(let j =0; j < registrations.length; j++) {
        if (state.labels[i] === registrations[j].labelName) {
          breaked = true
          break
        }
        
      }
      if (!breaked) {
        if(state.labels[i].length >2 ) {
          tableValues.push(
            {
              key: state.labels[i],
              label: state.labels[i],
              available: "Si",
              domain: <Typography.Link href={`https://app.ens.domains/name/${state.labels[i]}.eth/register`} target="_blank"> {`Registrar ${state.labels[i]} en ENS Domains`}</Typography.Link>,
              category: <CategoryTags categories={categories[state.labels[i]]?.Categories}></CategoryTags>,
              creationDate: "-",
              expiryDate: "-"
            },
          ) 
        }
        
      }
    }
  }
   
  return (
    <Table style={{margin: 10}} scroll={{x: true}} columns={state.from === "global" ? columnsGlobal: columnsLocal} dataSource={tableValues} />
  )
}

export default DomainsTable