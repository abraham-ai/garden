import { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// const { name } = req.query
	const { userId, token } = req.session;

	if (!token) {
		return res.status(401).json({ error: 'Not authenticated' })
	}

  if (!userId) {
    return res.status(401).json({ error: 'No user Id' })
  }

	try {
		const authTokenResult = await eden.setAuthToken(token)
		const collections = await eden.getCollections(userId)
		return res.status(200).json({ result: collections })
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' })
		// }
		return res.status(500).json({ error })
	}
}

export default withSessionRoute(handler)
