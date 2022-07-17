import React from 'react'
import { Button } from '../../componentsUI/Button'
import { Logo } from '../../componentsUI/Logo'
import './Header.scss'

export const Header: React.FC = () => {
	return (
		<header className='header'>
			<Logo/>
			<Button btnName='Connect wallet'/>
		</header>
	)
}
