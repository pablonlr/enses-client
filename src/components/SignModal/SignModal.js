import { Modal, Button, message } from 'antd'
import React, {useState, useEffect} from 'react'
import { useSignMessage, } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'


//this fuction requires a callback to return the signature
function SignModal(props) {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const { data, error, isLoading, signMessage } = useSignMessage(
        {onSuccess(data, variables) {
            // Verify signature when sign message succeeds
            const addr = verifyMessage(variables.message, data)
            setAddress(addr)
        },}
    )

    
 const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    signMessage({message: props.message})
  };
  const showModal = () => {
    if (props.message?.length < 1 ){
        message.error("El texto para firmar no de ser vacío")
        return
    }
    setOpen(true);
};


 useEffect(() => {
    if (data && address?.length > 0) {
        props.onSignature(address.toLowerCase(),data,props.message)
    }
    setOpen(false)
    
 }, [data] )


 useEffect(() => {
    if (error?.message) {
        if (error.name === "ConnectorNotFoundError") {
            message.error("conecte su billetera para firmar el mensaje")
            return
        }
        message.error("error firmando el mensaje con la billetera")
    }
    
 }, [error] )


  return (
    <div>
        <Button type="primary" onClick={showModal}>
            {props.btnTXT}
        </Button>
    
    <Modal
        title={`Autoriza la operación`}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Firmar"
        cancelText="Cancelar"
        open={open}
        >
        <p>Realiza una firma con tu billetera para autenticar la operación</p>

            
    </Modal>
    </div>
  )
}

export default SignModal