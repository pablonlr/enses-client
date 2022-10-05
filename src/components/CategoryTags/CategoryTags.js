import { Divider, Tag } from 'antd'
import React from 'react'

const omit = "español"

function CategoryTags(props) {
    if(props.categories?.length <1) {
        return <></>
    }
  return (
    <>
        {
        props.categories?.map((categorie) => {
            if (categorie !== omit) {
                return <Tag key={categorie} color="blue">{categorie}</Tag>
            }

        })
    }
    </>
   
  )
}

export default CategoryTags