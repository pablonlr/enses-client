import React, {useState, useEffect} from 'react'
import {
    Form,
    Input,
    Button,
    message,
    Modal,
    Typography,
  } from 'antd';
import SignModal from '../SignModal/SignModal';
import { json } from 'react-router-dom';
import { usePoulateCategoriesMutation } from '../../services/wordsInSpanish';

  const { TextArea } = Input;

function PopulateFrom() {
    const [form] = Form.useForm();
    const [{signature, address}, setSignature] = useState('');
    const [messToSign, setmessToSing] = useState('')
    const [modal, setModal] = useState(false)
    const [postCatgory, result] = usePoulateCategoriesMutation()

    const handleCancel = () => {
      setModal(false);
    };

    const handleConfirm = () => {
      
      const st = form.getFieldValue("field-words")
      const cat = form.getFieldValue("field-name")
      if(!cat) {
        message.warn("Debe especificar una categoría")
        return
      }
      if(!st) {
        message.warn("Debe añadir al menos una palabra")
        return
      }
      
      
      setModal(true)
      const arr = st.split("\n")
      const filtered = arr.filter(value => {
         return value != null && value.length>0 ;
      });
      setmessToSing(JSON.stringify(filtered))
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
       message.success("ocurrió un error en la solicitud, intente nuevamente")
       
      }
   }, [result])

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
        <Input />
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