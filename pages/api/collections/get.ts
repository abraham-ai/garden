import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'

interface CustomSession {
	name: string
	token: string
}
const eden = new EdenClient()

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<CollectionResponse> => {
	//   const { name } = req.query
	const { name: userId, token: authToken } = req.session as CustomSession

	// console.log({ req })
	console.log(req.url)

	if (typeof authToken === '' || typeof authToken === 'undefined') {
		res.status(401).json({ error: 'Authentication token is missing' })
		return
	}

	try {
		eden.setAuthToken(authToken)

		const collections = await eden.getCollections(userId)
		// console.log(collections)

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
