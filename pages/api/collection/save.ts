import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionId, creationId } = req.body

	// Save the user data in the session
	const session = req.session

	// const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	console.log('collectionId', collectionId)
	console.log('creationId', creationId)

	try {
		eden.setAuthToken(authToken)

		// get collection
		const collection = await eden.getCollection(collectionId)
		// console.log(collection)

		// filter collections by collectionId
		// const currentCollection = collections.filter((collection: Collection) => collection._id === collectionId)

		// get creation
		const creation = await eden.getCreation(creationId)

		// add creation to collection
		const addedCreationResult = await collection.addCreation(creation)
		console.log(addedCreationResult)

		res.status(200).json({ addedCreationResult, collection, creation })
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
