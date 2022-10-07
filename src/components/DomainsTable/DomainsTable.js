import React from 'react'
import { json, Link, useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Table, Typography } from 'antd';
import { useCategoriesFromArrayQuery } from '../../services/wordsInSpanish';
import CategoryTags from '../CategoryTags/CategoryTags';

const columns = [
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

function DomainsTable() {
    const { state } = useLocation();
   // const state = ["casa", "vida","accion", "desarrollo", "eth", "jgjjsgfhe", "loco", "loca", "amor", "amante", "amorio", "salir"]
    const {data: categories} = useCategoriesFromArrayQuery(state)
    const st = JSON.stringify(state)
    const queryString = gql`
{
  registrations(first: 1000, where: { labelName_in: ${st}}) {
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
    
  const { data, loading, error } = useQuery(queryString);
  if (error) {
    return (
      <div>Error</div>
    )
  }
  if (loading || categories === "undefined") {
    return (
      <div>loading...</div>
    )
  }
  
  const tableValues = []
  //fet registrations
   data.registrations?.map((registration) => {
    if(registration?.labelName?.length >3)
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
  for (let i =0; i < state.length; i++) {
    let breaked = false
    for(let j =0; j < data.registrations.length; j++) {
      if (state[i] === data.registrations[j].labelName) {
        breaked = true
        break
      }
      
    }
    if (!breaked) {
      if(state[i].length >3 ) {
        tableValues.push(
          {
            key: state[i],
            label: state[i],
            available: "Si",
            domain: <Typography.Link href={`https://app.ens.domains/name/${state[i]}.eth/register`} target="_blank"> {`Registrar ${state[i]} en ENS Domains`}</Typography.Link>,
            category: <CategoryTags categories={categories[state[i]]?.Categories}></CategoryTags>,
            creationDate: "-",
            expiryDate: "-"
          },
        ) 
      }
      
    }
  }
   
  return (
    <Table style={{margin: 10}} scroll={{x: true}} columns={columns} dataSource={tableValues} />
  )
}

export default DomainsTable