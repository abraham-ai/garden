import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'
import { sessionOptions } from '../../../util/withSession'
import type { IronSessionData } from '../../../util/withSession'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { method } = req
	const session = req.session as unknown as IronSessionData

	switch (method) {
		case 'GET':
			session.set('nonce', generateNonce())
			session.save()
			res.setHeader('Content-Type', 'text/plain')
			res.send(session.get('nonce'))
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${String(method)} Not Allowed`)
	}
}

export default withIronSessionApiRoute(handler, sessionOptions)
