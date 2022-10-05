import React, {useState,useEffect} from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    Switch,
    TreeSelect,
    Typography,
  } from 'antd';
import SelectDomain from '../SelectDomain/SelectDomain';
import { useFilterWordsMutation } from '../../services/wordsInSpanish';
import {SearchOutlined } from '@ant-design/icons';

function replaceUnd(value) {
    if (typeof(value) === "undefined"){
        return ""; // return 0 as replace, and end function execution
    }
    return value
}

function SearchBarFiltered() {
   const [category, setCategory] = useState("")
   const [form] = Form.useForm();
   const [search, result] = useFilterWordsMutation();
   const navigate = useNavigate();

   const onFinish = (values) => {
    const params = {
        length: replaceUnd(values["field-length"]),
        contains: replaceUnd(values["field-contains"]),
        category: replaceUnd(values["field-category"]),
        start: replaceUnd(values["field-start"]),
        end: replaceUnd(values["field-end"]),
        lang: ""
       }
       console.log(params)
   search(params)
  };

  useEffect(() => {
    if (result) {
        if (result.isSuccess) {
            if(result.data?.length>0){
                navigate("result",{state: result.data});
            }
            
        }
    }
  }, [result])

  return (
    <div >
    <Typography.Title level={3} style={{textAlign:"center", margin:30, }}> Realiza una búsqueda en nuestra librería orgánica de palabras y dominios:</Typography.Title>
    <Form
    form={form}
     style={{
        margin:40,
     }}
     labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 10,
      }}
      size="default"
      layout="horizontal"
      onFinish={onFinish}
      > 

        <Form.Item label="Palabras que contengan" name={`field-contains`}>
        <Input />
      </Form.Item>
      <Form.Item label="Palabras que empiecen por:" name={`field-start`}>
        <Input />
      </Form.Item>
      <Form.Item label="Palabras que terminen en:" name={`field-end`}>
        <Input />
      </Form.Item>
      <Form.Item label="Cantidad de letras:" name={`field-length`}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Categoría" name={`field-category`}>
        <SelectDomain onChange={(value)=> {setCategory(value)}}></SelectDomain>
      </Form.Item>
      <div style={{
        textAlign: "center",
      }}>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>
            Buscar
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Limpiar
    </Button>
      </div>
      
    </Form>
    </div>

  )
}

export default SearchBarFiltered