import type Reaction from './Reaction'
import type Creation from './Creation'

interface CreationExtended extends Creation {
	getReactions: (reactions: string[]) => Promise<Reaction[]>
}

export default CreationExtended
