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

	console.log('---MY-CREATIONS---')
	console.log('REQ userId: ', userId)

	try {
		console.log('My Creations')
		if (typeof authToken === 'string') {
			eden.setAuthToken(authToken)
		}

		const creator = await eden.getProfile()
		console.log(creator)

		const { username } = creator.user

		const creations = await eden.getCreations({ username, limit: 10 }) // username not working
		// console.log(creations)
		console.log(creations.length)

		console.log('userId: ', userId)
		console.log('username: ', username)

		res.status(200).json({ creations, creator })
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
