import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import type Reaction from '../../../interfaces/Reaction'
import type CreationExtended from '../../../interfaces/CreationExtended'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { reactionId: creationId } = req.query

	const session = req.session

	const userId = session?.userId ?? ''

	try {
		if (typeof creationId !== 'string') {
			res.status(400).json({ error: 'Invalid creationId' })
			return
		}

		const creation = (await eden.getCreation(
			creationId
		)) as unknown as CreationExtended

		const reactions: Reaction[] = await creation.getReactions(['🙌', '🔥'])

		const praises: Reaction[] = reactions?.filter(
			(reaction: Reaction) => reaction.reaction === '🙌'
		)
		const burns = reactions?.filter(
			(reaction: Reaction) => reaction.reaction === '🔥'
		)

		let praised = false
		let burned = false

		if (Array.isArray(reactions) && reactions.length > 0) {
			praised =
				userId !== undefined &&
				praises.some((reaction: Reaction) => reaction?.user?._id === userId)
			burned =
				userId !== undefined &&
				burns.some((reaction: Reaction) => reaction?.user?._id === userId)
		}

		const result = {
			praises: praises.length > 0 ? praises.length : 0,
			burns: burns.length > 0 ? burns.length : 0,
			praised,
			burned,
		}

		res.status(200).json(result)
		return
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error)
			res.status(500).json({ error })
		} else {
			res.status(500).json({ error: 'Unknown error' })
		}
	}
}

export default withSessionRoute(handler)
