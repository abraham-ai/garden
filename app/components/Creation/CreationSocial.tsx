import type { FC, CSSProperties } from 'react'
import type CreationSocialProps from '../../../interfaces/CreationSocial'

import React, { useState } from 'react'
import { useReaction } from '../../../context/ReactionContext'

import SaveButton from '../CreationActions/SaveButton'
import BurnButton from '../CreationActions/BurnButton'
import PraiseButton from '../CreationActions/PraiseButton'
import ShareButton from '../CreationActions/ShareButton'

import { Row } from 'antd'

const CreationSocial: FC<CreationSocialProps> = ({
	creationId,
	creation,
	reactionCountList,
	isMobile,
	appWidth,
	isCrModal,
	isCrIdPage,
}) => {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const { reactionState, updateReactionState } = useReaction()

	const {
		praises,
		praised: isPraised,
		burns,
		burned: isBurned,
	} = reactionState[creationId] ?? {}

	// console.log({ reactionState })

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

	// console.log({ creation })
	// console.log('CreationSocial: CreationId: ' + creationId)

	const styleContext = isMobile || isCrModal || isCrIdPage

	const handleCrWrapSocialPos = (): CSSProperties['position'] => {
		if (styleContext) {
			return 'relative'
		} else {
			return 'absolute'
		}
	}

	const handleCrWrapSocialAbsPos = (): string => {
		if (isCrIdPage && !isMobile) {
			return '20px 0'
		} else if (isMobile && isCrIdPage) {
			return '10px 0 0 60px'
		}
		return '0'
	}

	const handleCrSocialPos = (): number => {
		if (styleContext) {
			return 0
		} else {
			return 20
		}
	}

	const crWrapSocialPos = handleCrWrapSocialPos()
	const crWrapSocialAbsPos = handleCrWrapSocialAbsPos()
	const crSocialPos = handleCrSocialPos()

	return (
		<Row
			style={{
				display: 'flex',
				margin: crWrapSocialAbsPos,
				justifyContent: isMobile ? 'space-between' : 'unset',
			}}
		>
			<article
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					position: crWrapSocialPos,
					top: crSocialPos,
					left: crSocialPos,
					zIndex: 150,
					paddingRight: 10,
				}}
			>
				<BurnButton
					creationId={creationId}
					burns={Number(burns)}
					isBurned={isBurned}
					setIsBurned={handleBurnUpdate}
					isMobile={isMobile}
				/>
				<PraiseButton
					creationId={creationId}
					praises={Number(praises)}
					isPraised={isPraised}
					setIsPraised={handlePraiseUpdate}
					isMobile={isMobile}
				/>
			</article>

			<article
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					position: crWrapSocialPos,
					right: crSocialPos,
					top: crSocialPos,
					flex: isMobile ? 1 : 0,
					zIndex: 150,
				}}
			>
				<SaveButton
					isBookmarked={isBookmarked}
					setIsBookmarked={setIsBookmarked}
					creation={creation}
					isMobile={isMobile}
				/>
				<ShareButton creationId={creationId} isMobile={isMobile} />
			</article>
		</Row>
	)
}

export default CreationSocial
