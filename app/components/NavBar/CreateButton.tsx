import type { FC } from 'react'
import React, { useContext } from 'react'
import AppContext from '../../../context/AppContext'

import themeDefault from '../../../themes/themeDefault'
import themeDark from '../../../themes/themeDark'
import { Button, Space, ConfigProvider } from 'antd'
import { BsPlusLg } from 'react-icons/bs'
import styles from '../../../styles/CreateButton.module.css'

const CreateIcon = (): JSX.Element => {
	return (
		<Space className={`${styles.createIconWrapper}`}>
			<BsPlusLg className={`${styles.createIcon}`} />
		</Space>
	)
}

const CreateButton: FC = () => {
	const context = useContext(AppContext)
	const appTheme = context?.appTheme ?? 'light'
	const creationModal = context?.creationModal ?? false
	const setCreationModal = context?.setCreationModal ?? (() => {})

	const isLight = appTheme === 'light'
	const currentTheme = isLight ? themeDefault : themeDark

	return (
		<ConfigProvider
			theme={{
				algorithm: currentTheme,
				token: {
					colorPrimary: isLight ? '#000' : '#fff',
				},
			}}
		>
			<Button
				icon={<CreateIcon />}
				className={styles.createButton}
				type='primary'
				strong
				onClick={() => setCreationModal(!creationModal)}
			>
				{'Create'}
			</Button>
		</ConfigProvider>
	)
}

export default CreateButton
