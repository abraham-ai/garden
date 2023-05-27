import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import type Collection from '../../../interfaces/Collection'

import { withSessionRoute } from '../../../util/withSession'
import { EdenClient } from 'eden-sdk'

const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// Save the user data in the session
	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	if (authToken === '') {
		res.status(401).json({ error: 'Authentication token is missing' })
		return
	}

	try {
		eden.setAuthToken(authToken)

		const collections = (await eden.getCollections(
			userId
		)) as unknown as Collection[]
		console.log({ collections })

		const collectionsCreations = await Promise.all(
			collections.map(async (collection): Promise<any> => {
				// Creation[]
				const collectionId = collection._id
				// const collectionName = collection.name
				// console.log({ collectionId, collectionName })

				const collectionCreations = await eden.getCreations({
					collectionId,
					limit: 10,
				})

				console.log(
					`Collection Name ${String(collection.name)}, Creations Length: ${
						collectionCreations.length
					}`
				)
				// console.log(collection.name, collectionCreations.length)

				return collectionCreations
			})
		)

		// console.log(collectionsCreations)
		// console.log(collectionsCreations.length)

		res.status(200).json({ collections, collectionsCreations })
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
