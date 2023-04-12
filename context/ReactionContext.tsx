import React, { createContext, useState, useContext } from 'react'
import type { FC } from 'react'

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

export const ReactionProvider: FC<ReactionProviderProps> = ({ children }) => {
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
