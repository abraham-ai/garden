import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		collectionName: string
		creationId: string
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	const { collectionName, creationId } = req.body

	// Safely retrieve the session data
	const userId = req.session?.userId ?? ''
	const authToken = req.session?.token ?? ''

	console.log('collectionName', collectionName)
	console.log('creationId', creationId)

	try {
		await eden.setAuthToken(authToken)

		// create collection
		const createdCollection = await eden.createCollection(collectionName)
		const collections = await eden.getCollections(userId)
		console.log(createdCollection)
		console.log(collections)

		// get creation
		const creation = await eden.getCreation(creationId)

		// add creation to collection
		const addedCreationResult = await createdCollection.addCreation(creation)
		console.log(addedCreationResult)

		// result = await collections.create(name)
		// const collections = await creation.getCollections(filter)

		// console.log(result)
		// console.log(creations)

		res.status(200).json({ collectionName })
		return
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' })
		// }
		res.status(500).json({ error })
		// error.response.data
	}
}

export default withSessionRoute(handler)
