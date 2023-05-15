import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Row, Typography } from 'antd'
import styles from '../../../styles/CreationDate.module.css'
const { Text } = Typography

interface CreationDateProps {
	timeAgoCreatedAt: string
	appWidth: number
	page: string
	layout: string
}

const CreationDate: FC<CreationDateProps> = ({
	timeAgoCreatedAt,
	appWidth,
	page,
	layout,
}) => {
	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const isOverlay = layout === 'overlay'
	const isRelative = layout === 'relative'

	const isCrModal = page === 'modal'
	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'

	const isCrDate = isCrIdPage || isCreationsPage || isCrModal

	const dateWeight: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.weigthBold
				} else if (isRelative) {
					return styles.weightRegular
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.weightBold
				} else if (isRelative) {
					return styles.weightRegular
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.weightRegular
				} else if (isRelative) {
					return styles.weightRegular
				}
			}
		}
	}, [appWidth])

	const createdAtColor: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.textWhite
				} else if (isRelative) {
					return styles.textBlack
				}
			}
		}
	}, [appWidth])

	// console.log({ layout })
	// console.log({ page })
	// console.log(dateWeight)
	// console.log({ isMobile })
	// console.log({ timeAgoCreatedAt })
	// console.log({ isCrDate })

	return (
		<>
			{isCrDate ? (
				<Row id='crDate' className={`${styles.crDateWrapper}`}>
					<Text className={`${styles.crDate} ${createdAtColor} ${dateWeight}`}>
						{timeAgoCreatedAt}
					</Text>
				</Row>
			) : null}
		</>
	)
}

export default CreationDate
