import React, {useState, useEffect} from 'react'
import {
    Form,
    Input,
    Button,
    message,
    Modal,
    Typography,
    Table,
  } from 'antd';
import SignModal from '../SignModal/SignModal';
import { json } from 'react-router-dom';
import { useGetCategoriesTicketsQuery, usePoulateCategoriesMutation } from '../../services/wordsInSpanish';
import { arrayify } from 'ethers/lib/utils';

  const { TextArea } = Input;

  const columns = [
    {
      title: 'Categoría',
      dataIndex: 'category',
    },
    {
      title: 'Puntos',
      dataIndex: 'points',
    },
    {
      title: 'Nombre Reducido',
      dataIndex: 'short',
    },
    {
      title: 'Cantidad de Dominios',
      dataIndex: 'domainsCount',
    },
  ];

function PopulateFrom() {
    const {data: categories, isLoading, isError,isFetching, refetch} = useGetCategoriesTicketsQuery()
    const [form] = Form.useForm();
    const [{signature, address}, setSignature] = useState('');
    const [messToSign, setmessToSing] = useState('')
    const [modal, setModal] = useState(false)
    const [postCatgory, result] = usePoulateCategoriesMutation()

    const handleCancel = () => {
      setModal(false);
    };

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

    const handleConfirm = () => {
      
      const st = form.getFieldValue("field-words") 
      const cat = form.getFieldValue("field-name") 
      const short = form.getFieldValue("field-shortName") ? form.getFieldValue("field-shortName") : ""
      const points = form.getFieldValue("field-points") ? form.getFieldValue("field-points") : 0
      
      if(!cat) {
        message.warn("Debe especificar una categoría")
        return
      }
      
      
      /*
      Domains   []string `json:"domains"`
	ShortName string   `json:"shortName"`
	Points    int      `json:"points"`
	Topic     string   `json:"topic"`
      */
      
      setModal(true)
      let filtered = [];
      if(st) {
        const arr = st.split("\n")
        filtered = deleteETHAndEmptyDomains(arr)
      }
     
      const queryObj = {
        category: cat,
        domains: filtered,
        shortName: short,
        points: +points,
      }
      setmessToSing(JSON.stringify(queryObj))
    }

    const handleOk = () => {
      setModal(false);
    };

    const handleSignature = (addr, signature, mess) => {
      setSignature({signature: signature, address: addr});
    }

    useEffect(() => {
      if(signature) {
        setModal(false)
        message.success("firma completada, ahora puede publicar")
      }
    }, [signature])

    const onFinish = (values) => {
      if (!signature) {
        message.warn("debe firmar el mensaje antes de publicar")
        return
      }
      const cat = form.getFieldValue("field-name")
      if (!cat) {
        message.warn("categoría inválida, por favor inicie el proceso nuevamente")
        return
      }
      postCatgory({address:address,signature: signature,message: messToSign, category:cat})
      
    }

    useEffect(() => {
      if(result?.isSuccess)  {
       message.success("solicitud completada exitosamente")
       setTimeout(() => {
        document.location.reload();
      }, 2000);
       
       return
      }
      if(result?.isError)  {
       message.error("ocurrió un error en la solicitud. \n" +result.error.error)
      }
   }, [result])


   //{"CategoryID":"Objetos","ShortName":"OBJ","PriorityPoints":10,"Topic":"","DomainCounter":273}

   const data = categories?.map((category) => {
      return {
        "category":  category.CategoryID,
        "short": category.ShortName,
        "points": category.PriorityPoints,
        "domainsCount": category.DomainCounter
      }
   })

  return (
    <div>
    <Typography.Title level={4} style={{textAlign: "center" ,margin:40 }}> Añade palabras a una categoría: </Typography.Title>
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

    <Form.Item label="Nombre de la categoría" name={`field-name`}>
        <Input placeholder='Si no existe, se creará una nueva categoría'/>
    </Form.Item>
    <Form.Item label="Nombre reducido (para imagen)" name={`field-shortName`}>
        <Input placeholder='Ejemplo "0-100" para Cero a Cien (máximo 8 caracteres)' maxLength={8}/>
    </Form.Item>
    <Form.Item label="Puntos de relevancia (Orden más relevante)" name={`field-points`}>
        <Input type='number' placeholder='A más puntos más relevancia'/>
    </Form.Item>
    <Form.Item label="Palabras" name={`field-words`}>
        <TextArea autoSize={true} placeholder={"Separa las palabras en una nueva línea, ejemplo: \nperro\ngato\ntortuga\n..."}/>
    </Form.Item>
      
      
      
    <Form.Item>
    <div style={{float:"right"}}>
     <Button style={{margin:10}} onClick={handleConfirm}>
         Confirmar
      </Button>
      <Button style={{margin:10}} type="primary" htmlType="submit">
         Publicar
    </Button>
    </div>
    
    </Form.Item>
   
   
    </Form>
    <Table columns={columns} dataSource={data}/>
    <Modal title={`Confirma que quieres continuar`}
        //onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        //okText="Aceptar"
        //cancelText="Cancelar"
        open={modal}
        >
          <div style={{"textAlign": "center"}}>
          <p>{`Categoría: ${form.getFieldValue("field-name")}`}</p>
          <TextArea value={messToSign}>Palabras:</TextArea>
          <SignModal message={messToSign} btnTXT={"Autorizar"} onSignature={handleSignature}/>
          </div>
          
        </Modal>
    </div>
  )
}

export default PopulateFrom