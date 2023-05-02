import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'

interface CustomSession {
	userId: string
	token: string
}
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// Save the user data in the session
	const session = req.session as CustomSession

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	// console.log({ req })
	console.log(req.url)

	if (typeof authToken === 'undefined' || authToken === null) {
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
