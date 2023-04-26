import React, { useState, useMemo } from 'react'
import type { FC } from 'react'

import type CreationSocialProps from '../../interfaces/CreationSocial'

import { useReaction } from '../../context/ReactionContext'

import SaveButton from './CreationActions/SaveButton'
import BurnButton from './CreationActions/BurnButton'
import PraiseButton from './CreationActions/PraiseButton'
import ShareButton from './CreationActions/ShareButton'

import { Row } from 'antd'

type HandleCrSocialPos = (
	isMobile: boolean,
	isCreationModal: boolean
) => 'relative' | 'absolute'

const CreationSocial: FC<CreationSocialProps> = ({
	creationId,
	creation,
	reactionCountList,
	isMobile,
	isCreationModal
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

	const handleCrWrapSocialPos: HandleCrWrapSocialPos = (
		isMobile,
		isCreationModal
	) => {
		if (isMobile || isCreationModal) {
			return 'relative'
		} else {
			return 'absolute'
		}
	}

	const handleCrSocialPos = (isMobile, isCreationModal) => {
		if (isMobile === true || isCreationModal === true) {
			return 0
		} else {
			return 20
		}
	}

	const crWrapSocialPos = handleCrWrapSocialPos(isMobile, isCreationModal)
	const crSocialPos = handleCrSocialPos(isMobile, isCreationModal)

	return (
		<Row
			style={{
				display: 'flex',
				marginLeft: isMobile ? 60 : 0,
				marginTop: isMobile ? 10 : 0,
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
					praises={praises}
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
