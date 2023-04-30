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
	// const session = req.session
	// const userId = session?.userId ?? ''
	// const authToken = session?.token ?? ''
	// console.log({ queryCreatorId })
	// console.log({ authToken })

	console.log({ creatorId })

	try {
		const filter = {}
		Object.assign(filter, creatorId !== 'null' ? { userId: creatorId } : {})
		Object.assign(filter, { limit: 10 })
		console.log({ filter })

		const creator = await eden.getCreator(creatorId)
		console.log(creator)

		// const creatorProfile = await creator.getProfile() // 404
		// console.log(creatorProfile)

		const creatorCreations = await eden.getCreations(filter)
		console.log(creatorCreations.length)
		console.log(creatorCreations)

		res.status(200).json({ creatorCreations, creatorId }) // creatorProfile
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
