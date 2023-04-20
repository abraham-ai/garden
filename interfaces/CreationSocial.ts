import type Creation from './Creation'

interface CreationSocialTypes {
	reactionCountList?: {
		praises?: number
		praised?: boolean
		burns?: number
		burned?: boolean
	}
	creation: Creation
	creationId: string
	layout?: string
}

export default CreationSocialTypes
