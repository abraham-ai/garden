import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../../util/withSession'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { method } = req
	const { token, userId } = req.session

	switch (method) {
		case 'GET':
			res.send({ userId, token })
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${String(method)} Not Allowed`)
	}
}

export default withIronSessionApiRoute(handler, sessionOptions)
