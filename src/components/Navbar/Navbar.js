import React, {useState} from 'react'
import RainbowButton from '../RainbowButton/RainbowButton'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Mis Dominios',
    key: '',
    icon: <ProfileOutlined />,
  },
  {
    label: 'Buscar',
    key: 'search',
    icon: <SearchOutlined />,

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