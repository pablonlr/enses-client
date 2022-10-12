import React,{useState} from 'react'
import { AutoComplete, Typography } from 'antd';
import { Input, Space, Row, Col} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = AutoComplete;

function SimpleSearch() {

    const [result, setResult] = useState([]);
    const navigate = useNavigate()

    const handleSearch = (value) => {
      let res = [];
  
      if (!value || value.length < 3 || value.indexOf('.') >= 0) {
        res = [];
      } else {
        
        res =  [{label:`${value}.eth`, value: `${value}.eth`}];
      }
      setResult(res);
    }

    const onSelect = (value) => {
      console.log('onSelect', value);
    };

    const onSearch = (value) => {
    if (!value  || value.length < 3) {
      return
    }
    if (value.indexOf('.') < 0 ){
          value += ".eth"
      }
      navigate(`/domain/${value}`)
    }
  return (
   <>

<Row>
    <Col xs={24} xl={8}>
      
    </Col>
    <Col xs={24} xl={8}>
    <div style={{
        marginTop: 80
        
      }}></div>
    <Typography.Title style={{margin: 10}} level={3}>Busca un dominio .eth de manera global: </Typography.Title>
    <AutoComplete
      style={{
        width: "100%",

      }}
      onSearch={handleSearch}
      options={result}
      onSelect={onSelect}
    >
    <Input.Search size="large" placeholder="teclea un dominio" enterButton onSearch={onSearch} />
    </AutoComplete>
    </Col>
    <Col xs={24} xl={8}>
     
    </Col>
  </Row>

     
      
    
    
   </>
  )
}

export default SimpleSearch