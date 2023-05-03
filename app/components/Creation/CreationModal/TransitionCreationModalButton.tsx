import React, { useContext } from 'react'
import type { FC } from 'react'

import AppContext from '../../../../context/AppContext'

import { Button } from 'antd'

interface TransitionCreationModalButtonProps {
	direction: string
}

const TransitionCreationModalButton: FC<TransitionCreationModalButtonProps> = ({
	direction,
}) => {
	const context = useContext(AppContext)

	const currentCreationIndex = context?.currentCreationIndex ?? 0

	const setCurrentCreationIndex =
		context?.setCurrentCreationIndex != null
			? context.setCurrentCreationIndex
			: (index: number) => {}

	const handleModalTransition = (direction: string): void => {
		// console.log(`click ${direction}`)
		// console.log(currentCreationIndex)

		if (direction === 'next') {
			setCurrentCreationIndex(currentCreationIndex + 1)
		} else if (direction === 'prev') {
			setCurrentCreationIndex(currentCreationIndex - 1)
		}
	}

	return (
		<Button
			shape='circle'
			style={{
				position: 'absolute',
				transform:
					direction === 'prev' ? 'translateX(-45px)' : 'translateX(45)',
			}}
			onClick={() => {
				handleModalTransition('prev')
			}}
		>
			{direction === 'prev' ? '<' : '>'}
		</Button>
	)
}

export default TransitionCreationModalButton
