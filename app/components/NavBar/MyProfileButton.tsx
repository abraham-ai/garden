import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'
import { Button, Avatar } from 'antd'
import Blockies from 'react-blockies'

import { useAccount } from 'wagmi'
import styles from '../../../styles/MyProfileButton.module.css'

const MyProfileButton: FC = () => {
	const context = useContext(AppContext)
	const userId = context?.userId ?? ''
	const appTheme = context?.appTheme ?? 'light'
	const { address } = useAccount()

	console.log({ address, userId, appTheme })

	const handleClick = (event) => {
		event.target.classList.add(styles.purpleBorder)
	}

	return (
		<Button shape='circle' className={styles.button} onClick={handleClick}>
			<Avatar>
				<Blockies seed={address} size={10} scale={3} />
			</Avatar>
		</Button>
	)
}

export default MyProfileButton
