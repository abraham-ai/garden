import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		collectionId: string
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	const { collectionId } = req.body

	// Safely retrieve the session data
	const userId = req.session?.userId ?? ''
	const authToken = req.session?.token ?? ''

	try {
		await eden.setAuthToken(authToken)

		// create collection
		const collection = await eden.getCollection(collectionId)
		console.log(collection)

		// delete collection
		const deletedCollectionResult = await collection.delete()
		console.log(deletedCollectionResult)

		res.status(200).json(deletedCollectionResult)
		return
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ error })
	}
}

export default withSessionRoute(handler)
