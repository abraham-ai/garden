import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		collectionId: string
		newCollectionName: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionId, newCollectionName } = req.body

	// Safely retrieve the session data
	// const userId = req.session?.userId ?? ''
	const authToken = req.session?.token ?? ''

	try {
		eden.setAuthToken(authToken)

		// get collection
		const collection = await eden.getCollection(collectionId)
		console.log(collection)

		// renamte collection
		const renamedCollection = await collection.rename(newCollectionName)

		res.status(200).json(renamedCollection)
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
