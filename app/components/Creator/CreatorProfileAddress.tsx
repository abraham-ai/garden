import type { FC } from 'react'
import React from 'react'

import { Skeleton, Typography } from 'antd'

import Blockies from 'react-blockies'

import { useAccount } from 'wagmi'
const { Text } = Typography

interface CreatorProfileAddressProps {
	profileAddress: string
}

const CreatorProfileAddress: FC<CreatorProfileAddressProps> = ({
	profileAddress,
}) => {
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

export default CreatorProfileAddress
