import type { FC } from 'react'
import React from 'react'
import { usePathname } from 'next/navigation'
import MenuButton from './MenuButton'
import { Row } from 'antd'
import styles from '../../../styles/DesktopMenu.module.css'

const DesktopMenu: FC = () => {
	const pathname = usePathname()

	return (
		<Row className={styles.deskMenuWrapper}>
			<MenuButton title={'Creations'} path={pathname} />
			<MenuButton title='Collections' path={pathname} />
			<MenuButton title={'Creators'} path={pathname} />
			<MenuButton title='Concepts' path={pathname} />
		</Row>
	)
}

export default DesktopMenu
