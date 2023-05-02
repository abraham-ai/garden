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
	console.log(req.query)
	const { creatorId } = req.body
	const session = req.session
	const { userId, token } = session

	console.log({ creatorId })

	if (token == null) {
		res.status(401).json({ error: 'Not authenticated' })
		return
	}

	if (userId == null) {
		res.status(401).json({ error: 'No user Id' })
		return
	}

	try {
		console.log('--GET CREATOR--')
		const creatorProfile = await eden.getCreator(creatorId)
		console.log(creatorProfile)

		res.status(200).json({ creatorProfile })
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
