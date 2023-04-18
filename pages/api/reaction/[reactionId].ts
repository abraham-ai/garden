import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import type Reaction from '../../../interfaces/Reaction'
import type CreationExtended from '../../../interfaces/CreationExtended'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends Omit<NextApiRequest, 'query'> {
	body: {
		creationId: string
		reaction: string
	}
	query: {
		reactionId: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { reactionId: creationId } = req.query

	// console.log({ creationId })

	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	// if (!authToken) {
	//   return res.status(401).json({ error: 'Not authenticated' })
	// }

	try {
		if (typeof authToken === 'string') {
			eden.setAuthToken(authToken)
		}

		const creation = (await eden.getCreation(
			creationId
		)) as unknown as CreationExtended

		const reactions: Reaction[] = await creation.getReactions(['🙌', '🔥'])
		// console.log({ reactions })

		const praises: Reaction[] = reactions?.filter(
			(reaction: Reaction) => reaction.reaction === '🙌'
		)
		const burns = reactions?.filter(
			(reaction: Reaction) => reaction.reaction === '🔥'
		)

		// console.log(reactions[0]?.user)
		// console.log(reactions[1]?.user)

		// console.log(reactions)

		// console.log(
		// 	burns.some((reaction: Reaction) => {
		// 		console.log(reaction.user.username)

		// 		return reaction.user._id === userId
		// 	})
		// )
		// console.log(userId)

		const praised: boolean =
			userId !== undefined &&
			praises.some((reaction: Reaction) => reaction.user._id === userId)
		const burned: boolean =
			userId !== undefined &&
			burns.some((reaction: Reaction) => reaction.user._id === userId)

		const result = {
			praises: praises.length > 0 ? praises.length : 0,
			burns: burns.length > 0 ? burns.length : 0,
			praised,
			burned,
		}

		// console.log(result)

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
