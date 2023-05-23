import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

// console.log(req.body)
// const { creatorId: queryCreatorId } = req.query

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	console.log('CREATOR ROUTE GET CREATIONS -------------------------------')
	const { username, userId } = req.body
	console.log({ username, userId })

	try {
		const filter = {}
		Object.assign(filter, userId !== null ? { username } : {})
		Object.assign(filter, { limit: 10 })
		console.log({ filter })

		const creator = await eden.getCreator(userId)
		// const creatorProfile = await creator.getProfile()

		console.log(creator)

		const creatorCreations = await eden.getCreations(filter)
		console.log({ creatorId })
		console.log(creatorCreations.length)
		console.log(creatorCreations)

		const tempCreatorObj = {
			user: { username, userId: creatorId, _id: '' },
		}
		const creatorProfile = tempCreatorObj

		res.status(200).json({ creatorCreations, creatorProfile })
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
