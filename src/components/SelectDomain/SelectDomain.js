import React from 'react'
import { Select} from 'antd';
import { useGetCategoriesQuery } from '../../services/wordsInSpanish';
import { OmitProps } from 'antd/lib/transfer/ListBody';
const { Option } = Select;

const omit = "español"

function SelectDomain(props) {
    const {data: categories} = useGetCategoriesQuery()
  return (
    <Select  showSearch
                style={{
                    width: '100%'
                }}
                onChange={props.onChange}
                placeholder="Busca una categoría"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }>
                {
                    categories?.map((category) => {
                        if (category!== omit) {
                            return(
                                <Option value={category} key={category}>
                                    {category}
                                </Option>
                            )
                        }
                        
                    })
                }
            </Select>
  )
}

export default SelectDomain