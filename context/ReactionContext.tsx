import React, { createContext, useState, useContext } from 'react'
import type { FC, ReactNode } from 'react'

interface ReactionContextValue {
	reactionState: Record<string, any> // Adjust the type as needed
	updateReactionState: (creationId: string, newReaction: any) => void // Adjust the 'newReaction' type as needed
}

const ReactionContext = createContext<ReactionContextValue | undefined>(
	undefined
)

export const useReaction = () => {
	const context = useContext(ReactionContext)
	if (context == null) {
		throw new Error('useReaction must be used within a ReactionProvider')
	}
	return context
}

interface ReactionProviderTypes {
	children: ReactNode
}

export const ReactionProvider: FC<ReactionProviderTypes> = ({ children }) => {
	const [reactionState, setReactionState] = useState({})

	const updateReactionState = (creationId, newReaction): void => {
		setReactionState((prevState) => ({
			...prevState,
			[creationId]: {
				...prevState[creationId],
				...newReaction,
			},
		}))
	}

	return (
		<ReactionContext.Provider value={{ reactionState, updateReactionState }}>
			{children}
		</ReactionContext.Provider>
	)
}
