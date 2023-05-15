import type { FC, CSSProperties } from 'react'
import type CreationSocialProps from '../../../interfaces/CreationSocial'

import React, { useState, useMemo } from 'react'
import { useReaction } from '../../../context/ReactionContext'

import styles from '../../../styles/CreationSocial.module.css'

import SaveButton from '../CreationActions/SaveButton'
import BurnButton from '../CreationActions/BurnButton'
import PraiseButton from '../CreationActions/PraiseButton'
import ShareButton from '../CreationActions/ShareButton'

import { Row } from 'antd'

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

	const isOverlay = layout === 'overlay'
	const isRelative = layout === 'relative'
	const isCrModal = page === 'modal'
	const isCrIdPage = page === 'creationId'
	const isCreationsPage = page === 'creations'

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

	const socialMobile: string | null = isMobile ? styles.crSocialMobile : null

	const praiseBurnLayout: string | undefined = useMemo(() => {
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

	const saveShareLayout: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isOverlay) {
				return styles.crSaveShareOverlay
			} else if (isRelative) {
				return styles.crSaveShareMobile
			}
		} else if (isTablet) {
			if (isOverlay) {
				return styles.crSaveShareOverlay
			} else if (isRelative) {
				return styles.crSaveShare
			}
		} else {
			if (isOverlay) {
				return styles.crSaveShareOverlay
			} else if (isRelative) {
				return styles.crSaveShare
			}
		}
	}, [isMobile, isTablet])

	const socialPadding: string | undefined = useMemo(() => {
		if (isMobile) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			}
		} else if (isTablet) {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			}
		} else {
			if (isCrIdPage) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			} else if (isCrModal) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					console.log('padding relative modal!!')
					return styles.socialPaddingRelativeModal
				}
			} else if (isCreationsPage) {
				if (isOverlay) {
					return styles.socialPaddingOverlay
				} else if (isRelative) {
					return styles.socialPaddingRelative
				}
			}
		}
	}, [appWidth])

	// console.log(socialPadding)
	// console.log({ layout })
	// console.log({ page })
	// console.log('CreationSocial: CreationId: ' + creationId)
	// console.log({ isCrIdPage })
	// console.log({ isMobile })
	// console.log({ reactionState })
	// console.log({ creation })

	return (
		<Row
			className={`
				${styles.crSocial} ${socialMobile} ${socialPadding}
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

			<article className={saveShareLayout}>
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
