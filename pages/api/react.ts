import type { NextApiResponse } from 'next/types'
import type { ExtendedApiRequest } from '../../util/withSession'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { creationId, reaction, unreact } = req.body

	// console.log(creationId, reaction, unreact)

	const session = req.session

	// const userId = session?.userId ?? ''
	const authToken = session?.token ?? ''
	// console.log(authToken)

	if (authToken === '') {
		res.status(401).json({ error: 'Not authenticated' })
		return
	}

	try {
		if (typeof authToken === 'string') {
			eden.setAuthToken(authToken)
		}
		const creation = await eden.getCreation(creationId)
		let result
		if (typeof unreact !== 'undefined' && unreact !== null) {
			result = await creation.unreact(reaction)
			console.log('unreacted')
			console.log(result)
		} else {
			result = await creation.react(reaction)
			console.log('reacted')
			console.log(result)
		}
		res.status(200).json({ result })
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
}

export default withSessionRoute(handler)
