import React, { useState, useEffect, useContext } from 'react'

import AppContext from '../../context/AppContext'

import type CreationSocialType from '../../interfaces/CreationSocial'

import CreationSaveModal from './CreationSaveModal'

import SaveButton from './CreationActions/SaveButton'
import BurnButton from './CreationActions/BurnButton'
import PraiseButton from './CreationActions/PraiseButton'
import ShareButton from './CreationActions/ShareButton'

const CreationSocial = ({
  layout = 'minimal',
  creationBurns,
  creationPraises,
  creationId,
  creation,
  praisedByMe,
  burnedByMe
}: CreationSocialType): JSX.Element => {
  const [burns, setBurns] = useState(creationBurns)
  const [isBurned, setIsBurned] = useState(burnedByMe)

  const [praises, setPraises] = useState(creationPraises)
  const [isPraised, setIsPraised] = useState(praisedByMe)

  const [isBookmarked, setIsBookmarked] = useState(false)

  const context = useContext(AppContext)
  const isSignedIn = context?.isSignedIn || false
  const currentCreationIndex = context?.currentCreationIndex || 0

  const isSaveCreationModalOpen = context?.isSaveCreationModalOpen || false
  const setIsSaveCreationModalOpen = context?.setIsSaveCreationModalOpen || (() => {})

  useEffect(() => {
    setIsPraised(praisedByMe)
    setIsBurned(burnedByMe)
    setBurns(creationBurns)
    setPraises(creationPraises)
  }, [praisedByMe, burnedByMe, creationBurns, creationPraises])

  return (
    <>
      <article style={{ display: 'flex', alignItems: 'flex-start', position: 'absolute', top: 20, left: 20, zIndex: 150 }}>
        <BurnButton
          creationId={creationId}
          burnsData={burns}
          isBurnedData={isBurned}
          setIsBurned={setIsBurned}
          />
        <PraiseButton
          creationId={creationId}
          praisesData={praises}
          isPraisedData={isPraised}
          setIsPraised={setIsPraised}
          />
      </article>

      <article style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', position: 'absolute', right: 20, top: 20, zIndex: 150 }}>
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
