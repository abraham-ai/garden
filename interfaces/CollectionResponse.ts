import type CreatorProfile from './CreatorProfile'
import type Creation from './Creation'

export default interface CollectionResponse {
	collection?: {
		user: string
		name: string
	}
	creations: Creation[]
	creator: CreatorProfile
}
