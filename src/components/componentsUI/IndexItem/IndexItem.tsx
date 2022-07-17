import React, { useContext, useEffect, useMemo, useState } from 'react'
import Web3 from 'web3'
import { caContractContext } from '../../../App'
import { ICaContract, IIndexInfo } from '../../../types/types'
import './IndexItem.scss'

interface IIndexItem{
   index:string
}

const initialInfo = {
    ethPriceInWei:'0',
    name:'name',
    percentageChange:'0',
    usdCapitalization:'0',
    usdPriceInCents:'0'
  }

export const IndexItem:React.FC<IIndexItem> = ({index}) => {
    const caContract = useContext<ICaContract| null>(caContractContext);
    const [iteminfo,setItemInfo] = useState<IIndexInfo>(initialInfo)
    const [load,setLoad]= useState(true)

    useEffect(()=>{
        getItemInfo()
        // eslint-disable-next-line
    },[])

    const getItemInfo = async() =>{
       if(caContract){
          await caContract.methods.getIndex(index).call().then((indexInfo:IIndexInfo) => setItemInfo({...indexInfo}))
          setLoad(false)
       }
    }

    if(!load){
      const ethWei =  Web3.utils.fromWei(iteminfo.ethPriceInWei, 'ether')
      const usdPrice = (+iteminfo.usdPriceInCents) / 100
      const capitalization = iteminfo.usdCapitalization.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         
      return (
        <div className='indexItem '>
            <h3 className='indexItem__title'>{iteminfo.name}</h3>
            <div className='indexItem__current'> ${usdPrice} / {ethWei} ETH</div>
            <div className='indexItem__values'>
                <span className="indexItem__values-capitalization">${capitalization}.00</span>
                <div className="indexItem__values-persent">{iteminfo.percentageChange}%</div>
            </div>
        </div>
      )
    } 

return (
  <div className='indexItem '>
    <h3 className='indexItem__title loading'>{iteminfo.name}</h3>
    <div className='indexItem__current loading'> ${iteminfo.usdPriceInCents} / {iteminfo.ethPriceInWei} ETH</div>
    <div className='indexItem__values'>
      <span className="indexItem__values-capitalization loading">${iteminfo.usdCapitalization}.00</span>
      <span className="indexItem__values-persent loading">{iteminfo.percentageChange}%</span>
    </div>
  </div> 
  )
}