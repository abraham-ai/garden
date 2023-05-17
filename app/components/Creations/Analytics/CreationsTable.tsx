import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import React from 'react'
import Image from 'next/image'

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
				const textInput = creation?.task?.config?.text_input

				return (
					<Col key={creation._id}>
						<Row>
							<Text code>{index}</Text>
							<div>
								<Image
									alt={textInput}
									src={creation.thumbnail}
									width={50}
									height={50}
								/>
							</div>
							<Text>{timeAgoCreatedAt}</Text>
							<div>
								<Tag>
									<p>{creation._id}</p>
								</Tag>
							</div>
						</Row>
					</Col>
				)
			})}
		</Col>
	)
}

export default CreationsTable
