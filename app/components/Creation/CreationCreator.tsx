'use client'

import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'
import type CreatorProfile from '../../../interfaces/CreatorProfile'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

import Blockies from 'react-blockies'
import CreationDate from './CreationDate'
import timeAgo from '../../../util/timeAgo'
import abbreviateAddress from '../../../util/abbreviateAddress'

import styles from '../../../styles/CreationId.module.css'
import { Typography, Avatar } from 'antd'

const { Text } = Typography

interface CreationCreatorProps {
	layout: string
	page: string
	creation: Creation
	appWidth: number
	currentTheme: string
	creatorProfile: CreatorProfile
}

const CreationCreator: FC<CreationCreatorProps> = ({
	layout,
	page,
	creation,
	appWidth,
	currentTheme,
	creatorProfile,
}) => {
	const [isHovering, setIsHovering] = useState<boolean>(true)

	const timeAgoCreatedAt = timeAgo(Date.parse(creation?.createdAt))

	const handleMouseOver = (): void => {
		setIsHovering(true)
	}

	const handleMouseOut = (): void => {
		setIsHovering(false)
	}

	const isThemeLight = currentTheme === 'light'

	const isOverlay = layout === 'overlay'
	const isRelative = layout === 'relative'
	const isCrIdPage = page === 'creationId'
	const isCrModalPage = page === 'modal'
	const isCreationsPage = page === 'creations'

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	// console.log({ isMobile, isTablet })
	// console.log({ layout })
	// console.log({ page })
	// console.log({ creatorProfile })

	const creatorColor: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? styles.crCreatorWhite : styles.crcrCreatorWhite
				} else if (isRelative) {
					return isThemeLight ? styles.crCreatorBlack : styles.crCreatorWhite
				}
			}
		}
	}, [appWidth])

	// console.log(creatorColor)

	const creatorSizeStyles = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return styles.crCreatorSizeDefault
			} else if (isRelative) {
				return styles.crCreatorSizeDefault
			} else {
				return styles.crCreatorSizeDefault
			}
		} else if (isTablet) {
			if (isOverlay) {
				return styles.crCreatorSizeDefault
			} else if (isRelative) {
				return styles.crCreatorSizeDefault
			} else {
				return styles.crCreatorSizeDefault
			}
		} else {
			if (isOverlay) {
				return styles.crCreatorSizeDefault
			} else if (isRelative) {
				return styles.crCreatorSizeDefault
			} else {
				return styles.crCreatorSizeDefault
			}
		}
	}, [appWidth])

	const creatorWeight: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				}
			} else if (isCrModalPage) {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				}
			} else {
				if (isOverlay) {
					return isThemeLight ? styles.textWeightBold : styles.textWeightBold
				} else if (isRelative) {
					return isThemeLight ? styles.textWeightReg : styles.textWeightReg
				}
			}
		}
	}, [appWidth, page, layout, currentTheme])

	const isCreator =
		typeof creatorProfile?.user?.username !== 'undefined' &&
		creatorProfile?.user?.username !== null &&
		creatorProfile?.user?.username !== ''

	// console.log({ isCreator })

	const handleCreatorDisplay = (): string => {
		if (isCreator) {
			return creatorProfile?.user?.username
		} else {
			return abbreviateAddress(creation?.user ?? '')
		}
	}

	const handleCreatorAddress = (): string => {
		if (isCreator) {
			return creatorProfile?.user?.username
		} else {
			return creation?.user ?? ''
		}
	}

	const creatorUsername = creatorProfile?.user?.username ?? ''
	const creatorDisplay = handleCreatorDisplay()
	const creatorAddress = handleCreatorAddress()

	// console.log({ currentTheme })
	// console.log({ layout})

	// console.log('Creation User', creation?.user)
	// console.log({ isCreator })
	// console.log({ creation })
	// console.log({ creator })
	// console.log({ creatorDisplay })
	// console.log({ creatorAddress })
	// console.log({ creatorColorStyles })

	// console.log({ creatorSizeStyles })
	// console.log({ isMobile })
	// console.log({ isTablet })
	// console.log({ isOverlay })
	// console.log({ isRelative })

	// console.log({ isRelative })
	// console.log({ isCrIdPage })
	// console.log({ isThemeLight })
	// console.log({ creatorWeight })

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Link
				href={{
					pathname: `/creator/${String(creation?.user)}`,
					// query: { user: creation?.user },
				}}
				// as={`/creator/${String(creation?._id)}`}
				className={styles.crCreatorLink}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				style={{
					textDecoration: isHovering ? 'underline' : 'unset',
					marginRight: '1rem',
				}}
			>
				<Avatar size={50} icon={<Blockies scale={6} seed={creatorAddress} />} />
				<div
					className={styles.crCreatorNameWrapper}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					<Text
						className={`${String(creatorColor)} ${creatorSizeStyles} ${String(
							creatorWeight
						)}`}
						style={{
							textDecoration: isHovering ? 'underline' : 'unset',
						}}
					>
						{isCreator ? creatorUsername : creatorDisplay}
					</Text>
				</div>
			</Link>

			<CreationDate
				timeAgoCreatedAt={timeAgoCreatedAt}
				appWidth={appWidth}
				page={page}
				layout={layout}
			/>
		</section>
	)
}

export default CreationCreator
