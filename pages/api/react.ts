import { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		creationId: string
		reaction: string
		token: string
		userId: string
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	const { creationId, reaction } = req.body
	const { userId } = req.session
	const authToken = req.session.token

	// console.log({ creationId, reaction, userId, authToken })

	if (!authToken) {
		return res.status(401).json({ error: 'Not authenticated' })
	}

	try {
		const authTokenResult = await eden.setAuthToken(authToken)
		// console.log(authTokenResult)

		let profile = await eden.getProfile()
		// console.log(profile)

		const creation = await eden.getCreation(creationId)
		// console.log(creation)

		const result = await creation.react(reaction)
		// console.log(result)

		return res.status(200).json({ result })
	} catch (error: any) {
		// console.log(error)
		return res.status(500).json(error)
		// { error: error.response.data }
	}
}

export default withSessionRoute(handler)
