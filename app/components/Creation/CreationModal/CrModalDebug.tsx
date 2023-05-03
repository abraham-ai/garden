import React from 'react'
import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import { Typography } from 'antd'

const { Text } = Typography

interface CrModalDebugProps {
	creation: Creation
	creationIndex: number
	currentCreationIndex: number
}
const CrModalDebug: FC<CrModalDebugProps> = ({
	creation,
	creationIndex,
	currentCreationIndex,
}) => {
	return (
		<span
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: 10,
				flex: 0,
				justifyContent: 'flex-end',
			}}
		>
			<Text style={{ fontFamily: 'courier' }}>{creation._id}</Text>
			<Text style={{ fontFamily: 'courier' }}>
				{currentCreationIndex === 0 ? creationIndex : currentCreationIndex}
			</Text>
		</span>
	)
}

export default CrModalDebug
