import type Creation from './Creation'
import type CreatorProfile from './CreatorProfile'

interface CreatorCreations {
	creations: Creation[]
	creator: {
		creatorProfile: CreatorProfile
	}
}

export default CreatorCreations
