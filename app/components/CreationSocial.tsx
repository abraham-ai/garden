import React, { useState } from 'react'
import type { FC } from 'react'

import type CreationSocialType from '../../interfaces/CreationSocial'

import { useReaction } from '../../context/ReactionContext'

import SaveButton from './CreationActions/SaveButton'
import BurnButton from './CreationActions/BurnButton'
import PraiseButton from './CreationActions/PraiseButton'
import ShareButton from './CreationActions/ShareButton'

import { Row } from 'antd'

const CreationSocial: FC<CreationSocialType> = ({
	creationId,
	creation,
	reactionCountList,
	isMobile,
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

	console.log('CreationSocial: CreationId: ' + creationId)

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
					position: isMobile ? 'relative' : 'absolute',
					top: isMobile ? 0 : 20,
					left: isMobile ? 0 : 20,
					zIndex: 150,
					paddingRight: 10,
				}}
			>
				<BurnButton
					creationId={creationId}
					burns={Number(burns)}
					isBurned={isBurned}
					setIsBurned={handleBurnUpdate}
					layout={''}
					isMobile={isMobile}
				/>
				<PraiseButton
					creationId={creationId}
					praises={praises}
					isPraised={isPraised}
					setIsPraised={handlePraiseUpdate}
					layout={''}
					isMobile={isMobile}
				/>
			</article>

			<article
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					position: isMobile ? 'relative' : 'absolute',
					right: isMobile ? 0 : 20,
					top: isMobile ? 0 : 20,
					flex: isMobile ? 1 : 0,
					zIndex: 150,
				}}
			>
				<SaveButton
					isBookmarked={isBookmarked}
					setIsBookmarked={setIsBookmarked}
					creation={creation}
					layout={''}
					isMobile={isMobile}
				/>
				<ShareButton creationId={creationId} layout={''} isMobile={isMobile} />
			</article>
		</Row>
	)
}

export default CreationSocial
