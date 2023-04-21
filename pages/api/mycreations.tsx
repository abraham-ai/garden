import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../util/withSession'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// console.log({ req })
	// console.log(req.url)
	// console.log(req.body)

	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	console.log('REQ userId: ', userId)

	try {
		if (typeof authToken === 'string') {
			eden.setAuthToken(authToken)
		}

		const profileResult = await eden.getProfile()

		const { userId } = profileResult.user

		const creations = await eden.getCreations({ username: userId, limit: 10 })

		console.log('My Creations')
		// console.log(creations)
		console.log(creations.length)
		console.log(profileResult)
		console.log('userId: ', userId)

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
