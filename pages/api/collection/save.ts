import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		creationId: string
		collectionId: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	//   const { name } = req.query
	const { collectionId, creationId } = req.body

	// Save the user data in the session
	const session = req.session

	// const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	// console.log({ name })
	// console.log({ req })
	// console.log(req.url)
	//   console.log(req.body)

	console.log('collectionId', collectionId)
	console.log('creationId', creationId)

	try {
		eden.setAuthToken(authToken)

		// get collection
		const collection = await eden.getCollection(collectionId)
		console.log(collection)

		// filter collections by collectionId
		// const currentCollection = collections.filter((collection: Collection) => collection._id === collectionId)

		// get creation
		const creation = await eden.getCreation(creationId)
		console.log(creation)

		// add creation to collection
		const addedCreationResult = await collection.addCreation(creation)
		console.log(addedCreationResult)

		// console.log(result)
		// console.log(creations)
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
