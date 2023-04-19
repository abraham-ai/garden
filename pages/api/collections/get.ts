import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
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

		const collections = await eden.getCollections(userId)
		// console.log(collections)

		res.status(200).json({ result: collections })
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
