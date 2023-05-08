import type { FC, CSSProperties } from 'react'
import type Creation from '../../../../interfaces/Creation'
import type CreatorProfile from '../../../../interfaces/CreatorProfile'

import React, { useMemo } from 'react'

import { Row } from 'antd'

import CreationSocial from '../CreationSocial'
import CreationCreator from '../CreationCreator'

interface ReactionCountList {
	praises: number
	praised: boolean
	burns: number
	burned: boolean
}

interface CrModalHeaderProps {
	layout: string
	creation: Creation
	appWidth: number
	reactionCountList: ReactionCountList
	page: string
	currentTheme: string
	creator: CreatorProfile
}

const CrModalHeader: FC<CrModalHeaderProps> = ({
	layout,
	creation,
	appWidth,
	reactionCountList,
	page,
	currentTheme,
	creator,
}) => {
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

	console.log({ layout })

	return (
		<section style={headerSocialWrapperStyles}>
			<CreationCreator
				layout={layout}
				creation={creation}
				appWidth={appWidth}
				page={page}
				currentTheme={currentTheme}
				creator={creator}
			/>
			<Row style={socialWrapperStyles}>
				<CreationSocial
					layout={layout}
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
