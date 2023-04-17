import type { NextApiRequest, NextApiResponse } from 'next/types'
import type CollectionResponse from '../../../interfaces/CollectionResponse'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'

const eden = new EdenClient()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<CollectionResponse> => {
	//   const { name } = req.query

	// Save the user data in the session
	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	// console.log({ req })
	console.log(req.url)

	const emptyCollectionResponse = {
		collection: {},
		profile: { user: { userId: '' } },
		creations: [],
	}

	if (authToken === '') {
		res.status(401).json({ error: 'Authentication token is missing' })
		return emptyCollectionResponse
	}

	try {
		eden.setAuthToken(authToken)

		const collections = await eden.getCollections(userId)
		// console.log(collections)

		res.status(200).json({ result: collections })
		return emptyCollectionResponse
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error)
			res.status(500).json({ error })
		} else {
			res.status(500).json({ error: 'Unknown error' })
		}
		return emptyCollectionResponse
	}
}

export default withSessionRoute(handler)
