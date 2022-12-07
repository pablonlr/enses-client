import React, {useState} from 'react'
import RainbowButton from '../RainbowButton/RainbowButton'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileOutlined, SearchOutlined,FilterOutlined, GlobalOutlined, UnorderedListOutlined, ScissorOutlined, AppstoreAddOutlined, ToolOutlined, QuestionOutlined} from '@ant-design/icons';

const items = [
  {
    label: 'Mis Dominios',
    key: '',
    icon: <ProfileOutlined />,
  },
  {
    label: 'Filtros',
    key: 'filter/word',
    icon: <FilterOutlined />,
    children: [
      {
        label: 'Filtro en Español',
        key: 'filter/word',
        icon: <FilterOutlined />,
      },
      {
        label: 'Filtro Global',
        key: 'filter/global',
        icon: <GlobalOutlined />,
      }
    ]
  },
  {
    label: 'Buscar',
    key: 'search/simple',
    icon: <SearchOutlined />,
    children: [
      {
        label: 'Búsqueda individual',
        key: 'search/simple',
        icon: <SearchOutlined />,
      },
      {
        label: 'Búsqueda múltiple',
        key: 'search/bulk',
        icon: <UnorderedListOutlined />,
      }
    ]
  },
  {
    label: 'Moderar',
    key: 'moderate',
    icon: <ToolOutlined /> ,
    children: [
      {
        label: 'Pendiente',
        key: 'moderate/pending',
        icon: <QuestionOutlined />,
      },
      {
        label: 'Rellenar',
        key: 'moderate/populate',
        icon: <AppstoreAddOutlined />,
      },
      {
        label: 'Eliminar',
        key: 'moderate/delete',
        icon: <ScissorOutlined/>,
      }
    ]
  },
]

function Navbar() {
  const [current, setCurrent] = useState('domains');
  const navigate = useNavigate()

  const onClick = (e) => {
   navigate(`/${e.key}`);
    setCurrent(e.key);
  };
   
  return (
    <div className='nav-container'>
      <div style={{float:"right", margin:10}}>
      <RainbowButton></RainbowButton>
        </div> 
      <Menu theme="dark" mode='horizontal' style={{float:"center"}} onClick={onClick}  items={items} />
   
     
    </div>
    
  )
}

export default Navbar