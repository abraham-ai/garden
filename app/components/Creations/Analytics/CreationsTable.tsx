import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import React from 'react'

import timeAgo from '../../../../util/timeAgo'
import { Row, Col, Tag, Typography } from 'antd'
const { Text } = Typography

interface CreationsTableProps {
	creations: Creation[]
}

const CreationsTable: FC<CreationsTableProps> = ({ creations }) => {
	return (
		<Col style={{ maxHeight: 300, overflowX: 'hidden', overflowY: 'scroll' }}>
			{creations.map((creation, index) => {
				const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

				return (
					<Col key={creation._id}>
						<Row>
							<Text code>{index}</Text>

							<Text>{timeAgoCreatedAt}</Text>
							<Tag>
								<p>{creation._id}</p>
							</Tag>
						</Row>
					</Col>
				)
			})}
		</Col>
	)
}

export default CreationsTable
