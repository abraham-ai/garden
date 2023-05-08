'use client'

import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React from 'react'
import timeAgo from '../../../../util/timeAgo'
import styles from '../../../../styles/CreationId.module.css'
import { Typography } from 'antd'

import { MdOutlineDateRange } from 'react-icons/md'
import { BsAspectRatio } from 'react-icons/bs'
import { TbPrompt } from 'react-icons/tb'

const { Text } = Typography

interface CreationPropertiesProps {
	creationData: {
		creation: Creation
		creator: CreatorProfile
	}
}
const CreationProperties: FC<CreationPropertiesProps> = ({ creationData }) => {
	// console.log({ timeAgoCreatedAt })

	const timeAgoCreatedAt = timeAgo(Date.parse(creationData?.creation.createdAt))

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Text style={{ color: 'purple', fontWeight: 600 }}>{'/dream'}</Text>
			<Text style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>
				{creationData?.creation?.task?.config?.text_input ?? 'No text'}
			</Text>

			<ul className={styles.crPropertiesWrapper}>
				<li className={styles.crProperty}>
					<span className={styles.crPropertyType}>
						<MdOutlineDateRange
							className={styles.icon}
							style={{ fontSize: '1.5rem' }}
						/>
						<Text>{'Date'}</Text>
					</span>
					<Text>{timeAgoCreatedAt}</Text>
				</li>
				<li className={styles.crProperty}>
					<span className={styles.crPropertyType}>
						<TbPrompt className={styles.icon} style={{ fontSize: '1.5rem' }} />
						<Text>{'Command'}</Text>
					</span>
					<Text>{'/dream'}</Text>
				</li>
				<li className={styles.crProperty}>
					<span className={styles.crPropertyType}>
						<BsAspectRatio
							className={styles.icon}
							style={{ fontSize: '1.5rem' }}
						/>
						<Text>{'Shape'}</Text>
					</span>
					<Text>{'square'}</Text>
				</li>
			</ul>
		</div>
	)
}

export default CreationProperties
