import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'

import React, { useMemo } from 'react'

import { Row } from 'antd'

import CreationSocial from '../CreationSocial'
import CreationCreator from './CreationCreator'

import timeAgo from '../../../../util/timeAgo'

interface ReactionCountList {
	praises: number
	praised: boolean
	burns: number
	burned: boolean
}

interface CreationHeaderProps {
	creation: Creation
	appWidth: number
	isMobile: boolean
	reactionCountList: ReactionCountList
	displayAddress: string
}

const CrModalHeader: FC<CreationHeaderProps> = ({
	creation,
	isMobile,
	appWidth,
	reactionCountList,
	displayAddress,
}) => {
	const timeAgoCreatedAt = timeAgo(Date.parse(creation.createdAt))

	const crProfileActionsFlex = useMemo(() => {
		if (appWidth <= 768) {
			return 'row'
		} else if (appWidth >= 768 && appWidth <= 1024) {
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
				displayAddress={displayAddress}
				creation={creation}
				isMobile={isMobile}
				appWidth={appWidth}
				timeAgoCreatedAt={timeAgoCreatedAt}
			/>
			<Row style={socialWrapperStyles}>
				<CreationSocial
					creation={creation}
					creationId={creation._id}
					reactionCountList={reactionCountList}
					isMobile={isMobile}
					isCrModal={true}
					appWidth={appWidth}
					isCrIdPage={false}
				/>
			</Row>
		</section>
	)
}

export default CrModalHeader
