import React from 'react'
import {
    Button,
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
  import {SearchOutlined } from '@ant-design/icons';
  import {useNavigate} from "react-router-dom";


  function deleteETHAndEmptyDomains(values) {
    const response = []
     for( let i =0; i < values.length; i++) {
        const st = values[i].replace(/ /g,'').toLowerCase()
        if (st.length < 3) {
            continue
        }
        if (st.endsWith(".eth")) {
            if (st.length < 7) {
                continue
            }
            response.push(st.slice(0,st.length - 4))
            continue
        }
        response.push(st)
     }
     return response
  }

function BulkSearch() {
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = (values) => { 
       const area = values["field-text"]
       if (!area) {
            message.warn("Ingrese los dominios antes de continuar")
            return
       }
       if (area.length < 3 ){
        message.error("Debe introducir al menos un resultado")
            return
       }
       const arr = deleteETHAndEmptyDomains(area.split("\n"))
       if (!arr || arr.length<1) {
            message.error("Por favor revise los datos introducidos")
            return
       }
       navigate("result",{state: {
        labels: arr,
        from: "local"
      }})

    }

    return (
        <div >
        <Typography.Title level={3} style={{textAlign:"center", margin:30, }}> Realiza una búsqueda múltiple de dominios .eth (bulk search):</Typography.Title>
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
    
          <Form.Item label="Introduce los dominios para bulk search: " name={`field-text`}>
            <Input.TextArea placeholder={"Separa los dominios con una nueva línea, finalizando con o sin .eth\nEjemplo: \nnick.eth\nespañol\nens.eth\n..."} autoSize style={{height: 100}}/>
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

export default BulkSearch