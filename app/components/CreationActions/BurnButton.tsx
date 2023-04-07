import React, { useState, useEffect, useContext } from 'react'
import type { FC } from 'react'

import AppContext from '../../../context/AppContext'

import axios from 'axios'

import styles from '../../../styles/BurnButton.module.css'

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
  isBurnedData,
  setIsBurned
}: BurnButtonTypes) => {
  const context = useContext(AppContext)
  const isSignedIn = context?.isSignedIn || false
  const isWalletConnected = context?.isWalletConnected || false

  const [burns, setBurns] = useState<number>(burnsData)
  const [isBurned, setIsBurnedState] = useState<boolean>(isBurnedData)
  const [isBurnHovering, setIsBurnHovering] = useState<boolean>(false)

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

  const handleBurn = async (): Promise<void> => {
    // console.log('handle BURN 🔥 !')

    if (isSignedIn === false) {
      return
    } else if (isSignedIn === true && isWalletConnected === false) {
      return
    } else {
      try {
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
          setBurns(Number(burns) + 1)
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
    
        setIsBurned(!isBurned ? false : true as boolean)
      } catch (error: any) {
        console.log({ error })
      }
    }
  }

  let burnCount

  if (isSignedIn === true && isBurned === true) {
    burnCount = burns > 1
      ?
        (
          <Text className={styles.socialIconCount}>{burns}</Text>
        )
      : null
  } else {
    burnCount = burns > 0
      ? 
        (
          <Text className={styles.socialIconCount}>{burns}</Text>
        )
      : null
  }

  let burnClasses
  if (isSignedIn === true && isWalletConnected === true) {
    burnClasses = isBurned === true ? 'crBurn isActive' : 'crBurn'
  } else {
    burnClasses = 'crBurn disabled'
  }

  const burnGray = (
    <span style={{ filter: 'grayscale(1)', fontSize: '1.8rem' }}>{'🔥'}</span>
  )

  const burnFilled = (
    <span style={{ fontSize: '1.8rem' }}>{'🔥'}</span>
  )

  const handleMouseOver = (): void => {
    console.log('handleMouseOver')
    setIsBurnHovering(true)
  }

  const handleMouseOut = (): void => {
    console.log('handleMouseOut')
    setIsBurnHovering(false)
  }
    
  return (
    <div className='socialButtonWrapper' style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        className={burnClasses}
        size='large'
        type='text'
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
        onClick={handleBurn}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        >
          {isBurned === true && isBurnHovering === true
            ? 
            (
              <>
                  {burnFilled}
                  <Text style={{color: 'white', filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))', marginLeft: 10, fontWeight: 'bold' }}>
                    {burnCount}
                  </Text>
                </>
              )
              : (
                <>
                  {burnGray}
                  <Text style={{color: 'white', filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))', marginLeft: 10, fontWeight: 'bold' }}>
                    {burnCount}
                  </Text>
                </>
              )
            }
      </Button>
    </div>
  )
}

export default BurnButton
