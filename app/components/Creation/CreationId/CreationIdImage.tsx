import type { FC } from 'react'

import React from 'react'
import Image from 'next/image'

import { Col, Row } from 'antd'
import styles from '../../../../styles/CreationId.module.css'

interface CreationIdImageProps {
	creationData: CreationTypes
	size: string
	appWidth: number
}

const CreationIdImage: FC<CreationIdImageProps> = ({
	creationData,
	appWidth,
}) => {
	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	// console.log({ crStyles })

	return (
		<Col className={styles.crIdImage}>
			<Row className={styles.crPost}>
				<section className={styles.crCard}>
					<article className={styles.crImgWrapper}>
						<div className={styles.crImgWrapperMain}>
							<Image
								className={styles.crImg}
								style={{ width: '100%' }}
								width={creationData?.creation?.task?.config?.width ?? 0}
								height={creationData?.creation?.task?.config?.height ?? 0}
								alt={creationData?.creation?.task?.config?.text_input ?? ''}
								src={creationData?.creation?.thumbnail ?? ''}
							/>
						</div>

						<div className={styles.crImgWrapperBackground}>
							<Image
								className={styles.crImg}
								style={{ width: '100%' }}
								width={creationData?.creation?.task?.config?.width ?? 0}
								height={creationData?.creation?.task?.config?.height ?? 0}
								alt={creationData?.creation?.task?.config?.text_input ?? ''}
								src={creationData?.creation?.thumbnail ?? ''}
							/>
						</div>
					</article>
				</section>
			</Row>
		</Col>
	)
}

export default CreationIdImage
