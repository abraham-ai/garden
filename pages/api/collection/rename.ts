import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionId, newCollectionName } = req.body
	console.log({ collectionId, newCollectionName })

	// Safely retrieve the session data
	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	try {
		eden.setAuthToken(authToken)

		// get collection
		const collection = await eden.getCollection(collectionId)
		console.log(collection)

		// rename collection
		const renamedResult = await collection.rename(newCollectionName)
		console.log(renamedResult)

		// check collection name
		const newRenamedCollection = await eden.getCollection(collectionId)
		console.log(newRenamedCollection)

		// return updated collections
		const updatedCollections = await eden.getCollections(userId)

		res.status(200).json({ newRenamedCollection, updatedCollections })
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
