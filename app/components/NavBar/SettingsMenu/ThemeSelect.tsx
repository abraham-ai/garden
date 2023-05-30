import type { FC } from 'react'
import React, { useState } from 'react'
import { Radio } from 'antd'
import type { SizeType } from 'antd/es/config-provider/SizeContext'
import type { RadioChangeEvent } from 'antd'

const ThemeSelect: FC = () => {
	const [size, setSize] = useState<SizeType>('middle')

	const handleSizeChange = (e: RadioChangeEvent): void => {
		setSize(e.target.value)
	}

	return (
		<>
			<Radio.Group value={size} onChange={handleSizeChange}>
				<Radio.Button value='system'>{'System'}</Radio.Button>
				<Radio.Button value='light'>{'Light'}</Radio.Button>
				<Radio.Button value='dark'>{'Dark'}</Radio.Button>
			</Radio.Group>
		</>
	)
}

export default ThemeSelect
