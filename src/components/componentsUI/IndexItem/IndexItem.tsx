import React, { useMemo } from 'react'
import Web3 from 'web3'
import { IIndexInfo } from '../../../types'
import './IndexItem.scss'

export const IndexItem:React.FC<IIndexInfo> = (props) => {
  const {ethPriceInWei,name,percentageChange,usdCapitalization,usdPriceInCents} = props

  const ethWei = useMemo(()=>Web3.utils.fromWei(ethPriceInWei, 'ether'),[ethPriceInWei])
  const usdPrice = useMemo(() => (+usdPriceInCents) / 100, [usdPriceInCents])
  const capitalization = useMemo(() => {
    const usdFormater = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'})
    return usdFormater.format(+usdCapitalization)
  }, [usdCapitalization])
  

  const percent = (percentValue:string) =>{
    if (+percentValue >=0){
      return <span className='persentUp'>{percentValue}%</span>
    } else {
      return <span className='persentDown'>{percentValue}%</span>
    }
  } 
  
  return (
    <div className='indexItem '>
        <h3 className='indexItem__title'>{name}</h3>
        <div className='indexItem__current'> ${usdPrice} / {ethWei} ETH</div>
        <div className='indexItem__values'>
            <span className="indexItem__values-capitalization">{capitalization}</span>
            <div className="indexItem__values-persent">{percent(percentageChange)}</div>
        </div>
    </div>
  )
} 