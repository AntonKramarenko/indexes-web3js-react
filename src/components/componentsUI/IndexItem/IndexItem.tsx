import React from 'react'
import Web3 from 'web3'
import { IIndexInfo } from '../../../types/types'
import './IndexItem.scss'

// interface IIndexItem{
   
// }

export const IndexItem:React.FC<IIndexInfo> = (props) => {
  const {ethPriceInWei,name,percentageChange,usdCapitalization,usdPriceInCents} = props

  const ethWei =  Web3.utils.fromWei(ethPriceInWei, 'ether')
  const usdPrice = (+usdPriceInCents) / 100
  const capitalization = usdCapitalization.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         
  return (
    <div className='indexItem '>
        <h3 className='indexItem__title'>{name}</h3>
        <div className='indexItem__current'> ${usdPrice} / {ethWei} ETH</div>
        <div className='indexItem__values'>
            <span className="indexItem__values-capitalization">${capitalization}.00</span>
            <div className="indexItem__values-persent">{percentageChange}%</div>
        </div>
    </div>
  )
} 

