import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../util/withSession'
import { withSessionRoute } from '../../util/withSession'
import { EdenClient } from 'eden-sdk'

import emptyCreatorProfile from '../../constants/emptyCreatorProfile'

const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// const { creationId: creationIdQuery } = req.query;

	const { creationId: creationIdBody } = req.body

	try {
		const creation = await eden.getCreation(creationIdBody)
		console.log(creation)
		// console.log(creation)

		// const creatorResult = await eden.getCreator(creation.user)
		// console.log(creatorResult)

		// const creator = await creatorResult.getProfile()
		// console.log(creator)
		// console.log(creation)

		res.status(200).json({ creation, creator: emptyCreatorProfile })
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
