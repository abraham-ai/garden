import React from 'react'

const styles = {
	menuItem: {
		fontSize: 20,
	},
}

export default function CreatorDashboard({ creatorAddress = 'test' }) {
	return <div>{creatorAddress}</div>
}
