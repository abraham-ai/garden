import React, { useContext } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type { FC } from 'react'

import AppContext from '../../../../context/AppContext'

import { Button } from 'antd'

interface TransitionCreationModalButtonProps {
	direction: string
	creationsData: Creation[]
	creationIndex: number
	setCreationIndex: (index: number) => void
}

const TransitionCreationModalButton: FC<TransitionCreationModalButtonProps> = ({
	direction,
	creationsData,
	creationIndex,
	setCreationIndex,
}) => {
	const context = useContext(AppContext)

	const currentCreationModalCreation =
		context?.currentCreationModalCreation ?? {}
	const setCurrentCreationModalCreation =
		context?.setCurrentCreationModalCreation ?? (() => {})

	console.log({ creationIndex })
	console.log({ direction })
	console.log(creationsData[creationIndex])

	const handleModalTransition = (direction: string): void => {
		console.log(`click ${direction}`)
		console.log(creationIndex)

		if (direction === 'next') {
			setCreationIndex(creationIndex + 1)
			setCurrentCreationModalCreation(creationsData[creationIndex + 1])
		} else if (direction === 'prev') {
			setCreationIndex(creationIndex - 1)
			setCurrentCreationModalCreation(creationsData[creationIndex - 1])
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
