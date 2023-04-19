import type { NextApiResponse } from 'next'
import { withSessionRoute } from '../../../util/withSession'
import type { ExtendedApiRequest } from '../../../util/withSession'

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// Get the user from the session
	const userId = req.session.userId
	const token = req.session.token

	console.log('me.ts')
	console.log(req.url)
	console.log({ userId })

	if (typeof userId !== 'undefined' && userId !== null) {
		res.status(401).json({ message: 'Not authenticated' })
		return
	}

	// Return the user data
	res.status(200).json({ userId, token })
}

export default withSessionRoute(handler)
