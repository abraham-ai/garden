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

  const [isBurnHovering, setIsBurnHovering] = useState<boolean>(false)

  const handleBurn = async (): Promise<void> => {
    if (isSignedIn === false) {
      return;
    } else if (isSignedIn === true && isWalletConnected === false) {
      return;
    } else {
      const newIsBurned = !isBurnedData;
      const updatedBurns = newIsBurned
        ? burnsData + 1
        : burnsData - 1;
  
      setIsBurned(newIsBurned, updatedBurns);
  
      try {
        await axios.post("/api/react", {
          creationId,
          reaction: "🔥",
        });
      } catch (error) {
        setIsBurned(!newIsBurned, burnsData);
        console.error("Error updating praise:", error);
      }
    }
  };

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
        className={isBurnedData === true ? 'crBurn isActive' : 'crBurn'}
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
        onClick={async () => { await handleBurn() }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        >
          <span
          className='social-icon'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {isBurnedData === true || isBurnHovering === true ? burnFilled : burnGray}
        </span>
        <Text
          style={{color: 'white', filter: 'drop-shadow(3px 3px 3px rgb(0 0 0 / 0.4))', marginLeft: 10, fontWeight: 'bold' }}>
          {burnsData}
        </Text>
      </Button>
    </div>
  )
}

export default BurnButton
