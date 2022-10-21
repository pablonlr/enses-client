import React, {useState} from 'react'
import { Avatar, Button, Collapse, Dropdown, List, PageHeader, Skeleton, Space, Typography, Menu, Segmented, Input } from 'antd';
import CategoryTags from '../CategoryTags/CategoryTags';
import iconSVG from './enslogo.svg';
import { DownOutlined, SmileOutlined, BarsOutlined, AppstoreOutlined} from '@ant-design/icons';

const { Panel } = Collapse;
const {Search} = Input;

const menu = (
  <Menu
    items={[
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);


function ListDomains() {
  //const loadMoreDomains = props.loadMoreDomains
  const [domains, setDomains] =  useState([])
  const [list, setList] = useState([])
  const items = [
    {
      name: "cuba.eth",
      categories: ["verbos", "sustantivos"],
      available: true,
      loading: false,
    },
    {
      name: "ejemplo2.eth",     
      categories: ["verbos"],
      available: true,
      loading: false,
    },
    {
      name: "ejemplo3.eth",
      picture: "https://app.ens.domains/static/media/ENSIcon.e806751ddfd6a5b549e599544234f39f.svg",
      categories: ["verbos"],
      available: false,
      loading: false,
    },

  
  ]
  return (
    <div>
      <PageHeader
    title="Dominios"
    extra={[
      <Search
      placeholder="Busca un dominio"
      //onSearch={onSearch}
    />,
     <Dropdown.Button key={"more"} overlay={menu} icon={<DownOutlined/>}>
      Ordenar por
      
     </Dropdown.Button>,
      <Segmented
      options={[
        {
          value: 'List',
          icon: <BarsOutlined />,
        },
        {
          value: 'Kanban',
          icon: <AppstoreOutlined />,
        },
      ]}
    />
    ]}> 

   </PageHeader>

   
    <List
      style={{margin:20}}
      className="demo-loadmore-list"
      //loading={initLoading}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={items}
      bordered={true}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 2,
      }}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">Ver en ENS Domains</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={iconSVG} />}
              title={<a href={`/domain/${item.name}`}><Typography.Title level={5}>{item.name}</Typography.Title></a>}
              description={<div>{item.available ? "Disponible": "No disponible"}</div>}
            />
            <CategoryTags categories={item.categories}></CategoryTags>
            
          </Skeleton>
        </List.Item>
      )}
    />
    
    </div>
  )
}

export default ListDomains