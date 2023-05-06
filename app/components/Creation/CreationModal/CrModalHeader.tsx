import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useMemo } from 'react'

import { Row } from 'antd'

import CreationSocial from '../CreationSocial'
import CreationCreator from '../CreationCreator'

import timeAgo from '../../../../util/timeAgo'

interface ReactionCountList {
	praises: number
	praised: boolean
	burns: number
	burned: boolean
}

interface CreationHeaderProps {
	layout: string
	creation: Creation
	appWidth: number
	isMobile: boolean
	reactionCountList: ReactionCountList
	displayAddress: string
}

const CrModalHeader: FC<CreationHeaderProps> = ({
	layout,
	creation,
	appWidth,
	reactionCountList,
	displayAddress,
}) => {
	const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

	const isMobile = appWidth < 768
	const isTablet = appWidth >= 768 && appWidth <= 1024

	const crProfileActionsFlex = useMemo(() => {
		if (isMobile) {
			return 'row'
		} else if (isTablet) {
			return 'row'
		} else {
			return 'column'
		}
	}, [appWidth])

	const headerSocialWrapperStyles: CSSProperties = {
		display: 'flex',
		flexDirection: crProfileActionsFlex,
		justifyContent: 'space-between',
	}

	const socialWrapperStyles: CSSProperties = {
		position: 'relative',
		display: 'block',
		height: 'auto',
		padding: 0,
		margin: '20px 0 20px 0',
	}

	return (
		<section style={headerSocialWrapperStyles}>
			<CreationCreator
				layout={layout}
				displayAddress={displayAddress}
				creationData={creation}
				appWidth={appWidth}
				timeAgoCreatedAt={timeAgoCreatedAt}
			/>
			<Row style={socialWrapperStyles}>
				<CreationSocial
					creation={creation}
					creationId={creation._id}
					reactionCountList={reactionCountList}
					appWidth={appWidth}
				/>
			</Row>
		</section>
	)
}

export default CrModalHeader
