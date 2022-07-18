import React from 'react'
import './IndexItemLoader.scss'

export const IndexItemLoader = () => {
  return (
    <div className='indexItemLoader'>
        <div className='indexItemLoader__title'>Name</div>
        <div className='indexItemLoader__current'> Price</div>
        <div className='indexItemLoader__values'>Capitalization</div>
    </div>
  )
}