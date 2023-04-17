import type { NextApiResponse } from 'next'
import type { ExtendedNextApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'
import { generateNonce } from 'siwe'

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { method } = req

	switch (method) {
		case 'GET':
			req.session.set('nonce', generateNonce())
			await req.session.save()
			res.setHeader('Content-Type', 'text/plain')
			res.send(req.session.get('nonce'))
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${String(method)} Not Allowed`)
	}
}

export default withSessionRoute(handler)
