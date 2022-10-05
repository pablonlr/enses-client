import React, {useState, useEffect} from 'react'
import { Button, Modal, Select, message, Checkbox, Divider, Typography} from 'antd';
import { usePostCategoriesForLabelMutation, useGetCategoriesQuery } from '../../services/wordsInSpanish';
import SelectDomain from '../SelectDomain/SelectDomain';
import { PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

function CategorizationButton(props) {
    const label = props.label
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(true);
    const [spanishCheck, setSpanishCheck] = useState(true)
    const {data: categories} = useGetCategoriesQuery()
    const [category, setCategory] = useState('');
    const [postCatgory, result] = usePostCategoriesForLabelMutation()
    console.log(categories)


    useEffect(() => {
        if (result?.isLoading) {
            setConfirmLoading(true)
        }  else {
            setConfirmLoading(false)
        }
        if (result.isSuccess) {
           message.success(`Categorización de ${label}.eth pendiente a moderación`)
            setOpen(false)
            return
        }
         
    }, [result])

    //select
    const handleChange = (value) => {
        setCategory(value)
      };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        if (!spanishCheck) {
          message.warn("Actualmente solo aceptamos categorizaciones en Español")
          return
        }
        const cats = []
        if (spanishCheck && !props.alreadyInSpanish ){
           cats.push("español")
        }
        
        
        if (category?.length > 3) {
          cats.push(category)
        }
        postCatgory({"labelid": label, "categories": cats})
    };

    const onChange = (e) => {
      setSpanishCheck(e.target.checked);
    };
    
    console.log(props.alreadyInSpanish + "aaaaaaaaaa")
    const handleCancel = () => {
        setOpen(false);
      };



      return (
        <>
          
          <Button type="primary" onClick={showModal} shape="circle" icon={<PlusOutlined />}>
          </Button>
          <Modal
            title={`Categoriza ${label}.eth`}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Categorizar"
            cancelText="Cancelar"
          >
            
             <Checkbox disabled={props.alreadyInSpanish} checked={spanishCheck} onChange={onChange}>¿En Español?</Checkbox>
             
            <Divider>
             
            </Divider>
            
            <SelectDomain onChange={handleChange}></SelectDomain>
          </Modal>
        </>
      );
}

export default CategorizationButton