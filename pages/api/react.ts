import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		creationId: string
		reaction: string
		unreact: boolean
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	const { creationId, reaction, unreact } = req.body
	// const { userId } = req.session
	const authToken = req.session.token

	if (!authToken) {
		res.status(401).json({ error: 'Not authenticated' })
		return
	}

	try {
		await eden.setAuthToken(authToken)
		const creation = await eden.getCreation(creationId)
		if (unreact) {
			const result = await creation.unreact(reaction)
			res.status(200).json({ result })
			return
		} else {
			const result = await creation.react(reaction)
			res.status(200).json({ result })
			return
		}
	} catch (error: any) {
		// console.log(error)
		res.status(500).json(error)
		// { error: error.response.data }
	}
}

export default withSessionRoute(handler)
