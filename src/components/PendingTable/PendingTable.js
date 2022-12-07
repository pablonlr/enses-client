import { Button, Table, Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useGetPendingCategoriesQuery, useApproveCategoryForLabelsMutation} from '../../services/wordsInSpanish';
import SignModal from '../SignModal/SignModal';

const columns = [
  {
    title: 'Dominio',
    dataIndex: 'domain',
  },
  {
    title: 'Categoría',
    dataIndex: 'category',
  },
];

function PendingTable() {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const {data: labels, refetch} = useGetPendingCategoriesQuery();
    const [{signature, address}, setSignature] = useState('');
    const [messToSing, setmessToSing] = useState('');
    const [modal, setModal] = useState(false)
    const [postCatgory, result] = useApproveCategoryForLabelsMutation()
    const [approveODis, setApproveODis] = useState("")


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
      
      postCatgory({address:address,signature: signature,message: messToSing, approve: approveODis})
    };

    const buildAuthMess = () => {
      const approved = []
      selectedRowKeys.map((key) => {
        approved.push({
          "category": data[key].category,
          "domain": data[key].domain
        })
      })
      setmessToSing(JSON.stringify(approved))
      setModal(true)
    }
   
    const approve = () => {
      setApproveODis("approve")
      buildAuthMess()
    };

    const disapprove = () => {
      setApproveODis("disapprove")
      buildAuthMess()
    };

    useEffect(() => {
      if (labels) {
        const data = []
        let i = 0;
        for (const [categor, labs] of Object.entries(labels)) {
          labs?.map((lab) => {
            
            data.push({
              key: i,
              domain: lab,
              category: categor

            })
            i++;
          })
        }
        setData(data)
      }
       
    }, [labels])

    
    useEffect(() => {
       if(result?.isSuccess)  {
        setModal(false)
        message.success("solicitud completada exitosamente")
        refetch();
        
        return
       }
       if(result?.isError)  {
        message.success("ocurrió un error en la solicitud, intente nuevamente")
        
       }
    }, [result])
    
    
  
    const onSelectChange = (newSelectedRowKeys) => {
      
      setSelectedRowKeys(newSelectedRowKeys);
      console.log('selectedRowKeys', selectedRowKeys);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button type="primary" onClick={approve} disabled={!hasSelected} loading={loading}>
            Aprobar
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            <Button type="primary" onClick={disapprove} disabled={!hasSelected} loading={loading}>
            Rechazar
          </Button>
          </span>
            {modal}
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
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
    );
}

export default PendingTable