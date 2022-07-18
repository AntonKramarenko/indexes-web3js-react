import React, { useContext, useEffect, useState } from 'react'
import { caContractContext } from '../../../App'
import { ICaContract, IIndexInfo } from '../../../types/types'
import { IndexItem } from '../../componentsUI/IndexItem'
import { IndexItemLoader } from '../../componentsUI/IndexItemLoader'
import './IndexesBox.scss'

interface IIndexesBox {
    titleName: string,
    indexes: string[]
}

const initialInfo = {
    ethPriceInWei:'',
    name:'',
    percentageChange:'',
    usdCapitalization:'',
    usdPriceInCents:''
  }

export const IndexesBox:React.FC<IIndexesBox> = ({titleName,indexes}) => {
	const caContract = useContext<ICaContract| null>(caContractContext);
	const [itemInfo,setItemInfo] = useState<IIndexInfo[]>([initialInfo])
	const [load,setLoad]= useState(true)

	 useEffect(()=>{
        getItemInfo()
        // eslint-disable-next-line
    },[])

	const getItemInfo = async() =>{
		if(caContract){
			const indexArr:IIndexInfo[] = []
			await indexes.forEach( async (index:string) => {
				await caContract.methods.getIndex(index).call().then((indexInfo:IIndexInfo) => indexInfo).then(data => indexArr.push({...data}))
				await setItemInfo(indexArr)
			})
		   	// setLoad(false)
		}
		await setLoad(false)
	 }

	return (
		<div className='indexesBox'>
			<h3 className='indexesBox__title'>{titleName}</h3>
			{load  
				? indexes.map((index:string) =><IndexItemLoader key={titleName+index }/>)
				: itemInfo.map((indexInfo: IIndexInfo) =>  <IndexItem key={indexInfo.name } {...indexInfo} />)
			}
		</div>
	)
}
