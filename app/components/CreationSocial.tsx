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
	layout = 'minimal',
}) => {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const { reactionState, updateReactionState } = useReaction()

	const {
		praises,
		praised: isPraised,
		burns,
		burned: isBurned,
	} = reactionState[creationId] ?? {}

	const isLayoutMinimal = layout === 'minimal'

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
		<Row style={{ display: 'flex' }}>
			<article
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					position: isLayoutMinimal ? 'relative' : 'absolute',
					top: isLayoutMinimal ? 0 : 20,
					left: isLayoutMinimal ? 0 : 20,
					zIndex: 150,
					paddingRight: 10,
				}}
			>
				<BurnButton
					creationId={creationId}
					burns={Number(burns)}
					isBurned={isBurned}
					setIsBurned={handleBurnUpdate}
					layout={layout}
				/>
				<PraiseButton
					creationId={creationId}
					praises={praises}
					isPraised={isPraised}
					setIsPraised={handlePraiseUpdate}
					layout={layout}
				/>
			</article>

			<article
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					position: isLayoutMinimal ? 'relative' : 'absolute',
					right: isLayoutMinimal ? 0 : 20,
					top: isLayoutMinimal ? 0 : 20,
					zIndex: 150,
				}}
			>
				<SaveButton
					isBookmarked={isBookmarked}
					setIsBookmarked={setIsBookmarked}
					creation={creation}
					layout={layout}
				/>
				<ShareButton creationId={creationId} layout={layout} />
			</article>
		</Row>
	)
}

export default CreationSocial
