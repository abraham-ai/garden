import type { NextApiResponse } from 'next'
import { withSessionRoute } from '../../../util/withSession'
import type { ExtendedNextApiRequest } from '../../../util/withSession'

const handler = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// Get the user from the session
	const userId = req.session.userId
	const token = req.session.token

	console.log('me.ts')
	console.log(req.url)
	console.log({ userId })

	if (!userId) {
		res.status(401).json({ message: 'Not authenticated' })
		return
	}

	// Return the user data
	res.status(200).json({ userId, token })
}

export default withSessionRoute(handler)
