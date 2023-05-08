import type { FC, CSSProperties } from 'react'
import type CreationSocialProps from '../../../interfaces/CreationSocial'

import React, { useState, useEffect, useMemo } from 'react'
import { useReaction } from '../../../context/ReactionContext'

import styles from '../../../styles/CreationSocial.module.css'

import SaveButton from '../CreationActions/SaveButton'
import BurnButton from '../CreationActions/BurnButton'
import PraiseButton from '../CreationActions/PraiseButton'
import ShareButton from '../CreationActions/ShareButton'

import { Row, Typography } from 'antd'
const { Text } = Typography

const CreationSocial: FC<CreationSocialProps> = ({
	layout = 'relative',
	page = 'creationId',
	creationId,
	creation,
	reactionCountList,
	appWidth,
}) => {
	const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
	const { reactionState, updateReactionState } = useReaction()

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const {
		praises,
		praised: isPraised,
		burns,
		burned: isBurned,
	} = reactionState[creationId] ?? {}

	// console.log({ reactionState })

	const isOverlay = layout === 'overlay'
	const isRelative = layout === 'relative'
	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'

	const styleContext = isMobile || isRelative || isCrIdPage

	const handlePraiseUpdate = (
		isPraised: boolean,
		updatedPraises: number
	): void => {
		updateReactionState(creationId, {
			praised: isPraised,
			praises: updatedPraises,
		})
	}

	const handleBurnUpdate = (isBurned: boolean, updatedBurns: number): void => {
		updateReactionState(creationId, { burned: isBurned, burns: updatedBurns })
	}

	const crWrapSocialPos = useMemo((): CSSProperties['position'] => {
		if (styleContext) {
			return 'relative'
		} else {
			return 'absolute'
		}
	}, [isMobile, isTablet, isCrIdPage])

	const praiseBurnStyles: CSSProperties = {
		display: 'flex',
		alignItems: 'flex-start',
		position: crWrapSocialPos,
		zIndex: 150,
		margin: isMobile ? '20px 0 0 0' : '20px 0 0 20px',
	}

	const saveShareStyles: CSSProperties = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		position: crWrapSocialPos,
		flex: isMobile ? 1 : 0,
		zIndex: 150,
		margin: isMobile ? '20px 0 0 0' : '20px 20px 0 0',
	}

	const socialMobile = isMobile ? styles.crSocialMobile : null

	const praiseBurnLayout = useMemo((): string => {
		if (isMobile) {
			if (isOverlay) {
				return styles.crPraiseBurnOverlay
			} else if (isRelative) {
				return styles.crPraiseBurnMobile
			}
		} else if (isTablet) {
			if (isOverlay) {
				return styles.crPraiseBurnOverlay
			} else if (isRelative) {
				return styles.crPraiseBurn
			}
		} else {
			if (isOverlay) {
				return styles.crPraiseBurnOverlay
			} else if (isRelative) {
				return styles.crPraiseBurn
			}
		}
	}, [isMobile, isTablet])

	// console.log({ creation })
	// console.log('CreationSocial: CreationId: ' + creationId)
	// console.log({ isCrIdPage })
	// console.log({ isMobile })

	return (
		<Row
			className={`
				${styles.crSocial} ${String(socialMobile)}
			`}
		>
			<article className={praiseBurnLayout}>
				<BurnButton
					creationId={creationId}
					burns={Number(burns)}
					isBurned={isBurned}
					setIsBurned={handleBurnUpdate}
					appWidth={appWidth}
					page={page}
					layout={layout}
				/>
				<PraiseButton
					creationId={creationId}
					praises={Number(praises)}
					isPraised={isPraised}
					setIsPraised={handlePraiseUpdate}
					appWidth={appWidth}
					page={page}
					layout={layout}
				/>
			</article>

			<article style={saveShareStyles}>
				<SaveButton
					isBookmarked={isBookmarked}
					setIsBookmarked={setIsBookmarked}
					creation={creation}
					appWidth={appWidth}
					page={page}
					layout={layout}
				/>
				<ShareButton
					creationId={creationId}
					appWidth={appWidth}
					page={page}
					layout={layout}
				/>
			</article>
		</Row>
	)
}

export default CreationSocial
