import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionId } = req.query

	// Safely retrieve the session data
	const authToken = req.session.token ?? ''

	try {
		eden.setAuthToken(authToken)

		const collection = await eden.getCollection(collectionId)
		const profile = await eden.getProfile()

		const creations = await eden.getCreations({ collectionId, limit: 12 })

		res.status(200).json({ collection, creations, profile })
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
