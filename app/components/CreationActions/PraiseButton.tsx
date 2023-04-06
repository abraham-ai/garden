import React, { useState, useEffect, useContext } from 'react'

import AppContext from '../../../context/AppContext'

import axios from 'axios'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface PraiseButtonTypes {
  creationId: string
  praisesData: number
  isPraisedData: boolean
  setIsPraised: (value: boolean) => void
}

const PraiseButton = ({ creationId, praisesData, isPraisedData }: PraiseButtonTypes) => {
  const context = useContext(AppContext)
  const isSignedIn = context?.isSignedIn || false
  const isWalletConnected = context?.isWalletConnected || false

  const [praises, setPraises] = useState(praisesData)
  const [isPraised, setIsPraised] = useState(isPraisedData)

  const [isPraiseHovering, setIsPraiseHovering] = useState(false)

  // console.log({ praises, isPraised })
  // console.log({ praisesData, isPraisedData })

  useEffect(() => {
    if (
      typeof praisesData !== 'undefined' &&
      typeof isPraisedData !== 'undefined'
    ) {
      setPraises(praisesData)
      setIsPraised(isPraisedData)
    }
  }, [praisesData, isPraisedData])

  const handlePraise = async (): Promise<void> => {
    if (isSignedIn === false) {
      return
    } else if (isSignedIn === true && isWalletConnected === false) {
      return
    } else {
      // console.log('handle PRAISE 👏 !')
      await axios.post('/api/react', {
        creationId,
        reaction: '🙌'
      })
      // console.log({ data })
      
      let praiseOpperation = ''
      
      if (isPraised === true && praises > 0) {
        setPraises(praises - 1)
        praiseOpperation = 'decrease'
        setIsPraised(false)
      } else if (isPraised === false) {
        setPraises(praises + 1)
        praiseOpperation = 'increase'
        setIsPraised(true)
      }
      
      setIsPraised(isPraised === true ? false : true)
    }
  }

  let praiseCount
  if (isSignedIn && isPraised) {
    praiseCount =
      praises > 1 ? <span className='social-icon-count'>{praises}</span> : null
  } else {
    praiseCount =
      praises > 0 ? <span className='social-icon-count'>{praises}</span> : null
  }

  let praiseClasses
  if (isSignedIn) {
    praiseClasses = isPraised ? 'cr-praise is-active' : 'cr-praise'
  } else {
    praiseClasses = 'cr-praise disabled'
  }

  const praiseGray = (
    <span style={{ filter: 'grayscale(1)', fontSize: '1.8rem', marginBottom: 6 }}>{'🙌'}</span>
  )

  const praiseFilled = (
    <span style={{ fontSize: '1.8rem', marginBottom: 6 }}>{'🙌'}</span>
  )

  const handleMouseOver = () => {
    console.log('handleMouseOver')
    setIsPraiseHovering(true)
  }

  const handleMouseOut = () => {
    console.log('handleMouseOut')
    setIsPraiseHovering(false)
  }

  return (
    <div className='socialButtonWrapper' style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        className={praiseClasses}
        shape='round'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          width: 100,
          height: 50,
          border: 'none',
          transition: '1s'
        }}
        onClick={() => handlePraise()}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isPraised === true || isPraiseHovering === true ? praiseFilled : praiseGray}
        </span>
        <Text style={{color: 'white', filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))', marginLeft: 10, fontWeight: 'bold' }}>{praises}</Text>
      </Button>
    </div>
  )
}

export default PraiseButton
