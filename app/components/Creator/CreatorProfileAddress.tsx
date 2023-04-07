import React from 'react'

import { Skeleton, Typography } from 'antd'
const { Text } = Typography

// import styled from 'styled-components'
import Blockies from 'react-blockies'

import { useAccount } from 'wagmi'

export default function CreatorProfileAddress({ profileAddress }) {
	const { address } = useAccount()
	const currentAddress = address === profileAddress ? address : profileAddress

	if (!address) {
		return (
			<span>
				<Skeleton />
			</span>
		)
	}

	const displayAddress = currentAddress.slice(0, 6)

	return (
		<span
			className='creator-blockies-wrapper mobi'
			style={{ width: 300, height: 300 }}
		>
			<Blockies seed={currentAddress.toLowerCase()} size={32} scale={5} />
			<Text>{displayAddress}</Text>
		</span>
	)
}
