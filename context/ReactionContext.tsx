import React, { createContext, useState, useContext } from 'react'

const ReactionContext = createContext()

export const useReaction = () => {
  const context = useContext(ReactionContext)
  if (!context) {
    throw new Error('useReaction must be used within a ReactionProvider')
  }
  return context
}

export const ReactionProvider = ({ children }) => {
  const [reactionState, setReactionState] = useState({})

  const updateReactionState = (creationId, newReaction) => {
    setReactionState(prevState => ({
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
