import React, { useState } from 'react'

import { Button, Popover } from 'antd'

import ShareExtraButton from './ShareExtraButton'

import { FiMoreHorizontal } from 'react-icons/fi'
import { BiShare } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'

import styles from '../../../styles/CreationSocial.module.css'

const ShareButton = ({ creationId}: { creationId: string }) => {

  const [isShareHovering, setIsShareHovering] = useState(false)

  const handleMouseOver = () => {
    console.log('handleMouseOver')
    setIsShareHovering(true)
  }

  const handleMouseOut = () => {
    console.log('handleMouseOut')
    setIsShareHovering(false)
  }

  const bgHoverStyles = isShareHovering === true ? 'rgb(0, 186, 124, 0.2)' : 'rgba(84, 84, 84, 0.5)'

  return (
    <div className='crSocialsMain'
      style={{ display: 'flex', flexDirection: 'column' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span>
        <Button className='btn' shape='circle' type='link'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: bgHoverStyles,
            width: 50,
            height: 50,
            border: 'none',
            transition: '300ms'
          }}
        >
          { isShareHovering ?
            <IoIosShareAlt className={styles.crSocialIcon} size={18} style={{ bottom: 12, position: 'absolute', left: 12, fontSize: '1rem', minWidth: 25, minHeight: 25, transform: 'scaleX(1)', color: 'rgb(0, 186, 124)' }} />
            : 
            <BiShare className={styles.crSocialIcon} size={18} style={{ bottom: 12, position: 'absolute', left: 12, fontSize: '1rem', minWidth: 25, minHeight: 25, transform: 'scaleX(-1)' }} />
          }
        </Button>
      </span>
      

      {/* <div className='crSocialsExtra'>
        <Popover placement='topRight' content={<ShareExtraButton />}>
          <span className='crSocialShare'>
            <Button
              className='crSocialBtn'
              shape='circle'
              style={{ alignItems: 'center' }}
            >
              <FiMoreHorizontal className='icon' />
            </Button>
          </span>
        </Popover>
      </div> */}
    </div>
  )
}

export default ShareButton
