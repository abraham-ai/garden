import type { NextApiResponse } from 'next'
import { withSessionRoute } from '../../../util/withSession'
import type { ExtendedNextApiRequest } from '../../../util/withSession'

const handler = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// Get the user from the session
	const user = req.session.user

	if (!user) {
		res.status(401).json({ message: 'Not authenticated' })
		return
	}

	// Return the user data
	res.status(200).json({ user })

	// switch (method) {
	// 	case 'GET':
	// 		const token = session.get('token')
	// 		const userId = session.get('userId')

	// 		res.send({ userId, token })
	// 		break
	// 	default:
	// 		res.setHeader('Allow', ['GET'])
	// 		res.status(405).end(`Method ${String(method)} Not Allowed`)
	// }
}

export default withSessionRoute(handler)
