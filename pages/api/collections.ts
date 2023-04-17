import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// Save the user data in the session
	const session = req.session
	const { userId, token } = session

	if (token == null) {
		res.status(401).json({ error: 'Not authenticated' })
		return
	}

	if (userId == null) {
		res.status(401).json({ error: 'No user Id' })
		return
	}

	try {
		eden.setAuthToken(token)
		const collections = await eden.getCollections(userId)
		res.status(200).json({ result: collections })
		return
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error)
			res.status(500).json({ error })
		} else {
			res.status(500).json({ error: 'Unknown error' })
		}
		res.status(500).json({ error })
	}
}

export default withSessionRoute(handler)
