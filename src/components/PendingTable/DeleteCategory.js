import { Button, message, Modal} from 'antd'
import React, {useState, useEffect } from 'react'
import { useDeleteCategoryMutation } from '../../services/wordsInSpanish'
import SignModal from '../SignModal/SignModal';

function DeleteCategory({categoryID}) {
    const [postCatgory, result] = useDeleteCategoryMutation()
    const [messToSing, setmessToSing] = useState('');
    const [modal, setModal] = useState(false)
    const [{signature, address}, setSignature] = useState('');

    const deleteCategory = () => {
        buildAuthMess()
    }

    const handleSignature = (addr, signature, mess) => {
        setSignature({signature: signature, address: addr});
      }
  
      const handleCancel = () => {
        setModal(false);
      };
    
      const handleOk = () => {
         if (!signature) {
          message.warn("Debes firmar la operación antes de enviarla")
          return
        }
        
        postCatgory({address:address,signature: signature,message: messToSing, category: categoryID})
      };
  

    const buildAuthMess = () => {
        setmessToSing(JSON.stringify("delete"))
        setModal(true)
      }

    useEffect(() => {
        if(result?.isSuccess)  {
         setModal(false)
         message.success("solicitud completada exitosamente, recargue la página ")
         
         return
        }
        if(result?.isError)  {
         message.error("ocurrió un error en la solicitud, intente nuevamente")
         
        }
     }, [result])
  return (
    <div>
    <Button type="primary" onClick={deleteCategory} danger>
        Eliminar Categoría Completamente
    </Button>
        <Modal title={`¿Estás seguro que quieres continuar?`}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Enviar"
        cancelText="Cancelar"
        open={modal}
        >
        <div style={{"textAlign": "center"}}>
            <p>Antes de enviar los cambios, es necesario que autorices la operación: </p>
        <SignModal message={messToSing} onSignature={handleSignature} btnTXT="Proceder con la firma" >

        </SignModal>
        </div>
        
        </Modal>
    </div>
  )
}

export default DeleteCategory