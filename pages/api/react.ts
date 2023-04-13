import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'
import type { IronSessionData } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	session: IronSessionData
	body: {
		creationId: string
		reaction: string
		unreact: boolean
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { creationId, reaction, unreact } = req.body
	const authToken = req.session.token

	if (!(authToken === '')) {
		res.status(401).json({ error: 'Not authenticated' })
		return
	}

	try {
		if (typeof authToken === 'string') {
			eden.setAuthToken(authToken)
		}
		const creation = await eden.getCreation(creationId)
		let result
		if (unreact) {
			result = await creation.unreact(reaction)
		} else {
			result = await creation.react(reaction)
		}
		res.status(200).json({ result })
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
}

export default withSessionRoute(handler)
