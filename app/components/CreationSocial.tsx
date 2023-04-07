import React, { useState, useEffect } from 'react'

import type CreationSocialType from '../../interfaces/CreationSocial'

import { useReaction } from '../../context/ReactionContext'

import SaveButton from './CreationActions/SaveButton'
import BurnButton from './CreationActions/BurnButton'
import PraiseButton from './CreationActions/PraiseButton'
import ShareButton from './CreationActions/ShareButton'

import { Typography } from 'antd'
const { Text } = Typography

const CreationSocial = ({
	layout = 'minimal',
	creationId,
	creation,
}: CreationSocialType): JSX.Element => {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const { reactionState, updateReactionState } = useReaction()

	const {
		praises,
		praised: isPraised,
		burns,
		burned: isBurned,
	} = reactionState[creationId] || {}

	const handlePraiseUpdate = (isPraised: boolean, updatedPraises: number) => {
		updateReactionState(creationId, {
			praised: isPraised,
			praises: updatedPraises,
		})
	}

	const handleBurnUpdate = (isBurned: boolean, updatedBurns: number) => {
		updateReactionState(creationId, { burned: isBurned, burns: updatedBurns })
	}

	console.log({ creation })

	return (
		<>
			<article
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					position: 'absolute',
					top: 20,
					left: 20,
					zIndex: 150,
				}}
			>
				<BurnButton
					creationId={creationId}
					burnsData={burns}
					isBurnedData={isBurned}
					setIsBurned={handleBurnUpdate}
				/>
				<PraiseButton
					creationId={creationId}
					praisesData={praises}
					isPraisedData={isPraised}
					setIsPraised={handlePraiseUpdate}
				/>
			</article>

			<article
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-start',
					position: 'absolute',
					right: 20,
					top: 20,
					zIndex: 150,
				}}
			>
				<SaveButton
					isBookmarked={isBookmarked}
					setIsBookmarked={setIsBookmarked}
					creation={creation}
				/>
				<ShareButton creationId={creationId} />
			</article>
		</>
	)
}

export default CreationSocial
