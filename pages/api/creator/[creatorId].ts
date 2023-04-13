import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'
import type { IronSessionData } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends Omit<NextApiRequest, 'query'> {
	body: {
		creatorId: string
	}
	query: {
		creatorId: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// const { creatorId: queryCreatorId } = req.query
	const { creatorId } = req.body
	const { userId, token: authToken } = (req as IronSessionData).session

	// console.log({ queryCreatorId })
	// console.log({ creatorId })
	// console.log({ authToken })

	try {
		const filter = {}
		Object.assign(filter, creatorId !== 'null' ? { username: userId } : {})
		Object.assign(filter, { limit: 10 })
		console.log({ filter })

		await eden.setAuthToken(authToken)

		// if (typeof authTokenResult !== 'undefined') {
		const creations = await eden.getCreations(filter)
		console.log(creations.length)
		console.log(creations)
		res.status(200).json(creations)
		return
		// }
		// return res.status(200).json(null)
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' });
		// }
		res.status(500).json({ error })
		// error.response.data
	}
}

export default withSessionRoute(handler)
