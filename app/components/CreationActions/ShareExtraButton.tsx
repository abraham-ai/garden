import React from 'react'

import { Typography } from 'antd'
const { Text } = Typography

// import { FiMoreHorizontal } from 'react-icons/fi'
import { FaStar, FaRetweet } from 'react-icons/fa'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { IoIosShareAlt } from 'react-icons/io'

export default function ShareExtraButton() {
	return (
		<>
			<div className='cr-socials-main' style={{ display: 'flex' }}>
				<span className='cr-social like'>
					<button className='btn'>
						<FaStar className='icon' />
						<Text className='text'>{'303'}</Text>
					</button>
				</span>

				<span className='cr-social remix'>
					<button className='btn'>
						<FaRetweet className='icon' />
						<Text className='text'>{'310'}</Text>
					</button>
				</span>

				{/* <span className='cr-social views'>
            <Button className='btn' shape='round' type='default'>
            <AiFillEye className='icon' />
            <Text className='text'>310</Text>
            </Button>
        </span> */}

				<span className='cr-social bookmark'>
					<button className='btn'>
						<BsFillBookmarkFill className='icon' />
						<Text className='text'>Save</Text>
					</button>
				</span>

				<span className='cr-social share'>
					<button className='btn'>
						<IoIosShareAlt className='icon' />
						<Text className='text'>Share</Text>
					</button>
				</span>
			</div>
		</>
	)
}
