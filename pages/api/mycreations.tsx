import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		username: string
		generators: string[]
		earliestTime: number
		latestTime: number
		limit: number
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	// console.log({ req })
	// console.log(req.url)
	// console.log(req.body)

	const { userId, token: authToken } = (req as any).session

	try {
		const authTokenResult = await eden.setAuthToken(authToken)
		// const creations = await eden.getProfile()

		const creations = await eden.getCreations({ username: userId, limit: 10 })

		// console.log(creations.length)
		console.log(creations)

		res.status(200).json(creations)
		return
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' })
		// }
		res.status(500).json({ error })
		// error.response.data
	}
}

export default withSessionRoute(handler)
