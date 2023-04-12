import React from 'react'
import type { FC } from 'react'

interface CreatorDashboardTypes {
	profileAddress: string
}

const CreatorDashboard: FC<CreatorDashboardTypes> = ({
	profileAddress = 'test',
}) => {
	return <div>{creatorAddress}</div>
}

export default CreatorDashboard
