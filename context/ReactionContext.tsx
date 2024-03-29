import React, { createContext, useState, useContext, useCallback } from 'react'
import type { ReactNode } from 'react'

interface ReactionContextValue {
	reactionState: Record<string, any> // Adjust the type as needed
	updateReactionState: (creationId: string, newReaction: any) => void // Adjust the 'newReaction' type as needed
}

const ReactionContext = createContext<ReactionContextValue | undefined>(
	undefined
)

export const useReaction = (): ReactionContextValue => {
	const context = useContext(ReactionContext)
	if (context == null) {
		throw new Error('useReaction must be used within a ReactionProvider')
	}
	return context
}

interface ReactionProviderProps {
	children: ReactNode
}

export const ReactionProvider: React.FC<ReactionProviderProps> = ({
	children,
}) => {
	const [reactionState, setReactionState] = useState<
		ReactionContextValue['reactionState']
	>({})

	const updateReactionState = useCallback(
		(creationId: string, newValues: any) => {
			// Adjust the 'newValues' type as needed
			setReactionState((prevState) => ({
				...prevState,
				[creationId]: {
					...prevState[creationId],
					...newValues,
				},
			}))
		},
		[]
	)

	return (
		<ReactionContext.Provider value={{ reactionState, updateReactionState }}>
			{children}
		</ReactionContext.Provider>
	)
}
