import React, { useState, useEffect, useContext } from 'react'

import AppContext from '../../context/AppContext'

import { useAccount } from 'wagmi'

import { notification } from 'antd'

// Modal, Button, Input, Select
// import type { NotificationPlacement } from 'antd/es/notification/interface'

// import { FaRetweet } from 'react-icons/fa'

import type CreationSocialType from '../../interfaces/CreationSocial'

import CreationSaveModal from './CreationSaveModal'

import SaveButton from './CreationActions/SaveButton'
import BurnButton from './CreationActions/BurnButton'
import PraiseButton from './CreationActions/PraiseButton'
import ShareButton from './CreationActions/ShareButton'
// import RemixButton from './CreationActions/RemixButton'

const serverUrl = process.env.EDEN_API_URL

const styles = {
  socialTopWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    top: 0,
    position: 'absolute',
    padding: '10px',
    display: 'flex',
    alignItems: 'flex-start',
    zIndex: 150
  }
}

const CreationSocial = ({
  layout = 'minimal',
  creationBurns,
  creationPraises,
  creationId,
  praisedByMe,
  burnedByMe,
}: CreationSocialType) => {
  const [burns, setBurns] = useState(creationBurns)
  const [isBurned, setIsBurned] = useState(burnedByMe)

  const [praises, setPraises] = useState(creationPraises)
  const [isPraised, setIsPraised] = useState(praisedByMe)

  const [isBookmarked, setIsBookmarked] = useState(false)

  // const [remixes, setRemixes] = useState(0)
  // const [isRemixed, setIsRemixed] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalView, setModalView] = useState(1)

  const { address } = useAccount()

  const context = useContext(AppContext)
  const isSignedIn = context?.isSignedIn || false
  const currentCreationIndex = context?.currentCreationIndex || 0

  useEffect(() => {
    setIsPraised(praisedByMe)
    setIsBurned(burnedByMe)
    setBurns(creationBurns)
    setPraises(creationPraises)
  }, [praisedByMe, burnedByMe, creationBurns, creationPraises])

  const [api, contextHolder] = notification.useNotification()

  const isTooltipVisible = isSignedIn ? null : false

  // console.log({ creationPraises, praisedByMe, creationBurns, burnedByMe })
  // console.log({ praises, isPraised, burns, isBurned })

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

        {/* <RemixButton
          creationId={creationId}
          remixes={remixes}
          isRemixed={isRemixed}
          setIsRemixed={setIsRemixed}
        /> */}

        <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', right: 20, top: 20, zIndex: 150 }}>
          <SaveButton
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
          <ShareButton creationId={creationId} />
        </article>

      <CreationSaveModal modalOpen={modalOpen} setModalOpen={setModalOpen} creationId={creationId} />

      {contextHolder}
    </>
  )
}

export default CreationSocial
