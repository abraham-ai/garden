import { withIronSessionApiRoute } from 'iron-session/next'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { sessionOptions } from '../../../util/withSession'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const { token, userId } = req.session

	switch (method) {
		case 'GET':
			res.send({ userId, token })
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}

export default withIronSessionApiRoute(handler, sessionOptions)
