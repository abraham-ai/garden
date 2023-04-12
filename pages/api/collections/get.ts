import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'
import type CollectionResponse from '../../../interfaces/CollectionResponse'

import { EdenClient } from 'eden-sdk'

interface CustomSession {
	name: string
	token: string
}
const eden = new EdenClient()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<CollectionResponse> => {
	//   const { name } = req.query
	// Safely retrieve the session data

	const userId = req.session?.userId ?? ''
	const authToken = req.session?.token ?? ''

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
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' })
		// }
		res.status(500).json({ error })
		return emptyCollectionResponse
	}
}

export default withSessionRoute(handler)
