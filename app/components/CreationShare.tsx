import React from 'react';

// ANTD
import { Popover } from 'antd';

// EDEN COMPONENTS
import CreationSocialsExtra from '@/components/Creation/CreationCard/CreationSocials/CreationSocialsExtra/CreationSocialsExtra';

// ICONS
import { FiMoreHorizontal } from 'react-icons/fi';

// STYLES
// import { CreationSocialsStyles } from './CreationSocialsStyles';

const CreationSocials = () => {
  return (
    <div className='cr-socials-main'>
      {/* <span className='cr-social like'>
          <Button className='btn' shape='circle' type='default'>
            <FaStar className='icon' />
            <Text className='text'>303</Text>
          </Button>
        </span> */}

      <div className='cr-socials-extra'>
        {/* <Popover placement='topRight' content={<CreationSocialsExtra />}> */}
        <span className='cr-social share'>
          <button className='btn'>
            <FiMoreHorizontal className='icon' />
          </button>
        </span>
        {/* </Popover> */}
      </div>
    </div>
  );
};

export default CreationSocials;
