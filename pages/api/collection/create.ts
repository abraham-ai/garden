import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'
import type { IronSessionData } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		collectionName: string
		creationId: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { collectionName, creationId } = req.body

	// Safely retrieve the session data
	const session = req.session as unknown as IronSessionData

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	console.log('collectionName', collectionName)
	console.log('creationId', creationId)

	try {
		eden.setAuthToken(authToken)

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
