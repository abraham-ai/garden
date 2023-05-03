'use client'

import type { FC } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React from 'react'
import styles from '../../../../styles/CreationId.module.css'
import { Typography } from 'antd'

import { SlSizeFullscreen } from 'react-icons/sl'
import { MdOutlineDateRange } from 'react-icons/md'
import { BsAspectRatio } from 'react-icons/bs'
import { TbPrompt } from 'react-icons/tb'

const { Text } = Typography

interface CreationIdPropertiesProps {
	creationData: Creation
	timeAgoCreatedAt: string
}
const CreationIdProperties: FC<CreationIdPropertiesProps> = ({
	creationData,
	timeAgoCreatedAt,
}) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Text style={{ color: 'purple', fontWeight: 600 }}>{'/dream'}</Text>
			<Text style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>
				{creationData?.task?.config?.text_input ?? 'No text'}
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
						<SlSizeFullscreen
							className={styles.icon}
							style={{ fontSize: '1.2rem' }}
						/>
						<Text>{'Size'}</Text>
					</span>
					<Text>{'512 x 512'}</Text>
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

export default CreationIdProperties
