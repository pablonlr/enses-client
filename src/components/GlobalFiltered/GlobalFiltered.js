import React, {useState,useEffect} from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Radio,
    Select,
    Space,
    Switch,
    TreeSelect,
    Typography,
  } from 'antd';
import SelectDomain from '../SelectDomain/SelectDomain';
import { useFilterDomainsMutation } from '../../services/wordsInSpanish';
import {SearchOutlined } from '@ant-design/icons';

function replaceUnd(value) {
    if (typeof(value) === "undefined"){
        return ""; // return 0 as replace, and end function execution
    }
    return value
}

function GlobalFiltered() {
   const [form] = Form.useForm();
   const [search, result] = useFilterDomainsMutation();
   const navigate = useNavigate();

   const onFinish = (values) => {
    const params = {
        length: replaceUnd(values["field-length"]),
        contains: replaceUnd(values["field-contains"]),
        nocontains: replaceUnd(values["field-nocontains"]),
        start: replaceUnd(values["field-start"]),
        end: replaceUnd(values["field-end"]),
        special: replaceUnd(values["field-special"]),
        emojis: replaceUnd(values["field-emojis"]),
       }
       
   search(params)
  };

  useEffect(() => {
    if (result) {
        if (result.isSuccess) {
            if(result.data?.length>0 && result.data?.length < 20000){
              navigate("result",{state: {
                labels: result.data,
                from: "global"
              }})
            }else if (result.data?.length >= 20000) {
              message.error("Demasiados resultados de búsqueda, por favor acote los filtros")
            } else {
              message.warn("No se encontraron resultados")
            }
            
        }
    }
  }, [result])

  return (
    <div >
    <Typography.Title level={3} style={{textAlign:"center", margin:30, }}>Realiza una búsqueda entre los millones de dominios ENS registrados: </Typography.Title>
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

     <Form.Item label="Dominios que contengan" name={`field-contains`}>
        <Input />
      </Form.Item>
      <Form.Item label="Dominios que no contengan" name={`field-nocontains`}>
        <Input />
      </Form.Item>
      <Form.Item label="Dominios que empiecen por:" name={`field-start`}>
        <Input />
      </Form.Item>
      <Form.Item label="Dominios que terminen en:" name={`field-end`}>
        <Input />
      </Form.Item>
      <Form.Item label="Cantidad de letras:" name={`field-length`}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Caracteres especiales:" name={`field-special`}>
      <Select>
          <Select.Option value={"true"} >Con caracteres especiales</Select.Option>
          <Select.Option value={"false"} >Sin caracteres especiales</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Emojis:" name={`field-emojis`}>
      <Select>
          <Select.Option value={"true"} >Con emojis</Select.Option>
          <Select.Option value={"false"} >Sin emojis</Select.Option>
        </Select>
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

export default GlobalFiltered