import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// const { name } = req.query
	const { userId, token } = req.session

	if (!token) {
		res.status(401).json({ error: 'Not authenticated' })
		return
	}

	if (!userId) {
		res.status(401).json({ error: 'No user Id' })
		return
	}

	try {
		const authTokenResult = await eden.setAuthToken(token)
		const collections = await eden.getCollections(userId)
		res.status(200).json({ result: collections })
		return
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' })
		// }
		res.status(500).json({ error })
	}
}

export default withSessionRoute(handler)
