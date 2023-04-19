import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionId } = req.body

	// Safely retrieve the session data
	const session = req.session

	// const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	try {
		eden.setAuthToken(authToken)

		// create collection
		const collection = await eden.getCollection(collectionId)
		console.log(collection)

		// delete collection
		const deletedCollectionResult = await collection.delete()
		console.log(deletedCollectionResult)

		res.status(200).json(deletedCollectionResult)
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
