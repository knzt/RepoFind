import React from 'react'
import './repository.css'

function ItemList({title, description, link}) {
  return (
    <div className='item-list'>
        <a href={link}
        target='blank'
        title='abrir no github'>
            <strong>{title}</strong>
        </a>
        <p>{description}</p>
        <hr/>
    </div>
  )
}

export default ItemList
