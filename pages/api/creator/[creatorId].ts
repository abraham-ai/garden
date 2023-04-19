import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// const { creatorId: queryCreatorId } = req.query
	const { creatorId } = req.body

	// Save the user data in the session
	const session = req.session

	const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''

	// console.log({ queryCreatorId })
	// console.log({ creatorId })
	// console.log({ authToken })

	try {
		const filter = {}
		Object.assign(filter, creatorId !== 'null' ? { username: userId } : {})
		Object.assign(filter, { limit: 10 })
		console.log({ filter })

		eden.setAuthToken(authToken)

		// if (typeof authTokenResult !== 'undefined') {
		const creations = await eden.getCreations(filter)
		console.log(creations.length)
		console.log(creations)
		res.status(200).json(creations)
		return
		// }
		// return res.status(200).json(null)
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
