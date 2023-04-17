import type { NextApiResponse } from 'next'
import { withSessionRoute } from '../../../util/withSession'
import { generateNonce } from 'siwe'

const handler = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { method } = req
	const session = req.session

	switch (method) {
		case 'GET':
			session.set('nonce', generateNonce())
			await session.save()
			res.setHeader('Content-Type', 'text/plain')
			res.send(session.get('nonce'))
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${String(method)} Not Allowed`)
	}
}

export default withSessionRoute(handler)
