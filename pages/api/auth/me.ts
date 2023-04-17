import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../../util/withSession'
import type { IronSessionData } from '../../../util/withSession'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { method } = req
	const session = req.session as unknown as IronSessionData
	const token = session.get('token')
	const userId = session.get('userId')

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
