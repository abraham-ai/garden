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
	const setCurrentCreationIndex = context?.setCurrentCreationIndex ?? (() => {})
	const currentCreationModalCreation =
		context?.currentCreationModalCreation ?? {}
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})
	const creationsData = context?.creationsData ?? []

	console.log({ currentCreationIndex })
	console.log({ direction })

	const handleModalTransition = (direction: string): void => {
		console.log(`click ${direction}`)
		console.log(currentCreationIndex)

		if (direction === 'next') {
			setCurrentCreationIndex(currentCreationIndex + 1)
			setCurrentCreationModalCreation(creationsData[currentCreationIndex + 1])
		} else if (direction === 'prev') {
			setCurrentCreationIndex(currentCreationIndex - 1)
			setCurrentCreationModalCreation(creationsData[currentCreationIndex - 1])
		}
	}

	const isPrev = direction === 'prev'

	return (
		<Button
			shape='circle'
			style={{
				position: 'absolute',
				right: isPrev ? 'unset' : -50,
				left: isPrev ? -10 : 'unset',
				transform: isPrev ? 'translateX(-45px)' : 'translateX(45)',
			}}
			onClick={() => {
				handleModalTransition(direction)
			}}
		>
			{direction === 'prev' ? '<' : '>'}
		</Button>
	)
}

export default TransitionCreationModalButton
