import type Creation from './Creation'

interface CreationSocialProps {
	reactionCountList?: {
		praises?: number
		praised?: boolean
		burns?: number
		burned?: boolean
	}
	creation: Creation
	creationId: string
	layout?: string
	page?: string
	appWidth: number
}

export default CreationSocialProps
