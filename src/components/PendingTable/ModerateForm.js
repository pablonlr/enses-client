import React, { useState } from 'react'
import { useGetCategoryQuery } from '../../services/wordsInSpanish';
import SelectDomain from '../SelectDomain/SelectDomain';
import DeleteCategory from './DeleteCategory';
import ModerateTable from './ModerateTable';

function ModerateForm() {
    const [category, setCategory] = useState('');
    const handleChange = (value) => {
      setCategory(value)
    };
  return (
    <div>
      <div style={{"maxWidth": "400px", "marginTop": "10px", "marginLeft": "8px"}}>
      <SelectDomain onChange={handleChange}></SelectDomain>
      </div>
    
    {category.length > 1 ? 
    <div><ModerateTable categoryID={category} /> 
        <DeleteCategory categoryID={category}/>
     </div>
    : 
    <div style={{"marginTop": "5px", "marginLeft": "8px"}}>Seleccione una categoría para continuar</div>
    }
    </div>
  )
}

export default ModerateForm