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

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// console.log({ req })
	// console.log(req.url)
	// console.log(req.body)

	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	try {
		if (typeof authToken === 'string') {
			eden.setAuthToken(authToken)
		}
		// const creations = await eden.getProfile()

		const creations = await eden.getCreations({ username: userId, limit: 10 })

		// console.log(creations.length)
		console.log(creations)

		res.status(200).json(creations)
		return
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error)
			res.status(500).json({ error })
		} else {
			res.status(500).json({ error: 'Unknown error' })
		}
	}
}

export default withSessionRoute(handler)
