import React, { useContext, useEffect, useState } from 'react'
import { caContractContext } from '../../../App'
import { ICaContract, IIndexInfo } from '../../../types'
import { IndexItem } from '../../componentsUI/IndexItem'
import { IndexItemLoader } from '../../componentsUI/IndexItemLoader'
import './IndexesBox.scss'

interface IIndexesBox {
    titleName: string,
    indexes: string[]
}

export const IndexesBox:React.FC<IIndexesBox> = ({titleName,indexes}) => {
	const caContract = useContext<ICaContract| null>(caContractContext);
	const [itemInfo,setItemInfo] = useState<IIndexInfo[]>([])

	 useEffect(()=>{
        getItemInfo()
        // eslint-disable-next-line
    },[])

	const getItemInfo = async () =>{
		if(caContract){
			try {
				const indexArr:IIndexInfo[] = []
				for( const index  of indexes) {
			 		await caContract.methods.getIndex(index).call().then((indexInfo:IIndexInfo) => indexArr.push({...indexInfo}))
				}
				setItemInfo(indexArr)
			} catch (error) {
				throw new Error('get item info Error')
			}
		}
	 }

	return (
		<div className='indexesBox'>
			<h3 className='indexesBox__title'>{titleName}</h3>
			{!itemInfo.length 
				? indexes.map((index:string) =><IndexItemLoader key={titleName+index }/>)
				: itemInfo.map((indexInfo: IIndexInfo) =>  <IndexItem key={indexInfo.name } {...indexInfo} />)
			}
		</div>
	)
}