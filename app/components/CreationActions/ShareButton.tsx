import React from 'react';

import { Button, Popover } from 'antd';

import ShareExtraButton from './ShareExtraButton';

import { FiMoreHorizontal } from 'react-icons/fi';
import { IoIosShareAlt } from 'react-icons/io';

const ShareButton = ({ creationId}: { creationId: string }) => {
  return (
    <div className='cr-socials-main' style={{ display: 'flex' }}>
      <span className='cr-social share'>
        <Button className='btn' shape='circle'>
          <IoIosShareAlt className='icon' size={18} />
          {/* <span className='text'>Share</span> */}
        </Button>
      </span>

      <div className='crSocialsExtra'>
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
      </div>
    </div>
  );
};

export default ShareButton;
