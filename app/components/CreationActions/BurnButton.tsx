import React, { useState, useEffect, useContext } from 'react'
import type { FC } from 'react'

import AppContext from '../../../context/AppContext'

import axios from 'axios'

import { Button, Typography } from 'antd'
const { Text } = Typography

interface BurnButtonTypes {
  creationId: string
  burnsData: number
  isBurnedData: boolean
  setIsBurned: (value: boolean) => void
}

const BurnButton: FC<BurnButtonTypes> = ({
  creationId,
  burnsData,
  isBurnedData
}: BurnButtonTypes) => {
  const context = useContext(AppContext)
  const isSignedIn = context?.isSignedIn || false

  const [burns, setBurns] = useState(burnsData)
  const [isBurned, setIsBurned] = useState(isBurnedData)

  const [isBurnHovering, setIsBurnHovering] = useState(false)

  // console.log({ burns, isBurned })
  // console.log({ burnsData, isBurnedData })

  useEffect(() => {
    if (
      typeof burnsData !== 'undefined' &&
      typeof isBurnedData !== 'undefined'
    ) {
      setBurns(burnsData)
      setIsBurned(isBurnedData)
    }
  }, [burnsData, isBurnedData])

  const handleBurn = async () => {
    // console.log('handle BURN 🔥 !')

    if (isSignedIn === false) {
      return
    } else {
      await axios.post('/api/react', {
        creationId,
        reaction: '🔥'
      })
      // console.log({ data })
      
      let burnOpperation = ''
  
      if (isBurned === true && burns > 0) {
        setBurns(burns - 1)
        burnOpperation = 'decrease'
        setIsBurned(false)
      } else if (isBurned === false) {
        setBurns(burns + 1)
        burnOpperation = 'increase'
        setIsBurned(true)
      }
  
      // const results = await axios.post(serverUrl + '/update_stats', {
      //   creation: creationSha,
      //   stat: 'burn',
      //   opperation: burnOpperation,
      //   address: address,
      // })
  
      // setBurns(results.data.burn)
  
      setIsBurned(!isBurned)
    }
  }

  let burnCount

  if (isSignedIn && isBurned) {
    burnCount =
      burns > 1 ? <span className='social-icon-count'>{burns}</span> : null
  } else {
    burnCount =
      burns > 0 ? <span className='social-icon-count'>{burns}</span> : null
  }

  let burnClasses
  if (isSignedIn) {
    burnClasses = isBurned ? 'crBurn isActive' : 'crBurn'
  } else {
    burnClasses = 'crBurn disabled'
  }

  const burnGray = (
    <span style={{ filter: 'grayscale(1)', fontSize: '1.8rem' }}>{'🔥'}</span>
  )

  const burnFilled = (
    <span style={{ fontSize: '1.8rem' }}>{'🔥'}</span>
  )

  const handleMouseOver = () => {
    console.log('handleMouseOver')
    setIsBurnHovering(true)
  }

  const handleMouseOut = () => {
    console.log('handleMouseOut')
    setIsBurnHovering(false)
  }

  return (
    <div className='socialButtonWrapper' style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        className={burnClasses}
        shape='round'
        type='link'
        onClick={() => handleBurn()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          width: 100,
          height: 50,
          border: 'none',
          transition: '1s',
          marginRight: 10
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isBurned === true || isBurnHovering === true ? burnFilled : burnGray}
        </span>
        <Text style={{color: 'white', filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))', margin: ' 0 20px 0 10px', fontWeight: 'bold' }}>{burns}</Text>
      </Button>
    </div>
  )
}

export default BurnButton
