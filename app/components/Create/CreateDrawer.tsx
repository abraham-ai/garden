import type { FC } from 'react'
import React, { useState } from 'react'
import type { DrawerProps, RadioChangeEvent } from 'antd'
import { Button, Drawer, Radio, Space, Typography } from 'antd'
const { Text } = Typography

const CreateDrawer: FC = () => {
	const context = useContext(AppContext)

	const [open, setOpen] = useState(false)
	const [placement, setPlacement] = useState<DrawerProps['placement']>('left')

	const showDrawer = (): void => {
		setOpen(true)
	}

	const onClose = (): void => {
		setOpen(false)
	}

	const onChange = (e: RadioChangeEvent): void => {
		setPlacement(e.target.value)
	}

	return (
		<>
			<Space>
				<Radio.Group value={placement} onChange={onChange}>
					<Radio value='top'>{'top'}</Radio>
					<Radio value='right'>{'right'}</Radio>
					<Radio value='bottom'>{'bottom'}</Radio>
					<Radio value='left'>{'left'}</Radio>
				</Radio.Group>
				<Button type='primary' onClick={showDrawer}>
					{'Open'}
				</Button>
			</Space>
			<Drawer
				title='Basic Drawer'
				placement={placement}
				closable={false}
				onClose={onClose}
				open={open}
				key={placement}
				size={'100vh'}
			>
				<Text>{'Create what is on your mind...'}</Text>
			</Drawer>
		</>
	)
}

export default CreateDrawer
