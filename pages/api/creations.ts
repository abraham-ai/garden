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
	const { limit, username, generators, earliestTime, latestTime } = req.query

	try {
		const filter = { limit }
		Object.assign(filter, username !== 'null' ? { username } : {})
		Object.assign(filter, generators !== 'null' ? { generators } : {})
		Object.assign(filter, earliestTime !== 'null' ? { earliestTime } : {})
		Object.assign(filter, latestTime !== 'null' ? { latestTime } : {})
		Object.assign(filter, limit != null ? { limit } : {})

		const creations = await eden.getCreations(filter)

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
