import React from 'react'
import './Button.scss'

interface IButton {
    btnName: string
}

export const Button: React.FC<IButton> = ({btnName}) => {
	return (
		<button className='button'>{btnName}</button>
	)
}
