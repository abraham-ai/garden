import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends Omit<NextApiRequest, 'query'> {
	body: {
		collectionId: string
	}
	query: {
		collectionId: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionId } = req.query

	console.log({ collectionId })

	// Safely retrieve the session data
	// const userId = req.session?.userId ?? ''
	const authToken = req.session?.token ?? ''

	try {
		eden.setAuthToken(authToken)

		const collection = await eden.getCollection(collectionId)
		const profile = await eden.getProfile()
		// console.log(collection)

		const creations = await eden.getCreations({ collectionId, limit: 12 })
		// console.log(creations)
		// const creations = await collection.getCreations()
		// console.log(creations)

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
