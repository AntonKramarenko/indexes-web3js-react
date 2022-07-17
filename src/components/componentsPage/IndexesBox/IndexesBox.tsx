import React from 'react'
import { IndexItem } from '../../componentsUI/IndexItem'
import './IndexesBox.scss'

interface IIndexesBox {
    titleName: string,
    indexes: string[]
}

export const IndexesBox:React.FC<IIndexesBox> = ({titleName,indexes}) => {
	return (
		<div className='indexesBox'>
			<h3 className='indexesBox__title'>{titleName}</h3>
			{indexes.map((index:string) =><IndexItem key={titleName+index } index={index}/>)}
		</div>
	)
}
