import type { FC } from 'react'

import React from 'react'
import Image from 'next/image'

import { Col, Row } from 'antd'
import styles from '../../../../styles/CreationId.module.css'

interface CreationIdImageProps {
	creationData: CreationTypes
	size: string
}

const CreationIdImage: FC<CreationIdImageProps> = ({ size, creationData }) => {
	return (
		<Col className={styles.creation}>
			<Row className={styles.crPost}>
				<section className={`${styles.crCard} ${size}`}>
					<article className={styles.crImgWrapper}>
						<div className={styles.crImgWrapperMain}>
							<Image
								className={styles.crImg}
								style={{ width: '100%' }}
								width={creationData?.task?.config?.width ?? 0}
								height={creationData?.task?.config?.height ?? 0}
								alt={creationData?.task?.config?.text_input ?? ''}
								src={creationData?.thumbnail ?? ''}
							/>
						</div>

						<div className={styles.crImgWrapperBackground}>
							<Image
								className={styles.crImg}
								style={{ width: '100%' }}
								width={creationData?.task?.config?.width ?? 0}
								height={creationData?.task?.config?.height ?? 0}
								alt={creationData?.task?.config?.text_input ?? ''}
								src={creationData?.thumbnail ?? ''}
							/>
						</div>
					</article>
				</section>
			</Row>
		</Col>
	)
}

export default CreationIdImage
