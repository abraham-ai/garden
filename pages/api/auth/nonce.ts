import type { NextApiResponse } from 'next'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'
import { generateNonce } from 'siwe'

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { method } = req

	console.log('nonce.ts')
	console.log(method)

	switch (method) {
		case 'GET':
			console.log('req.session:', req.session) // Add this line

			req.session.nonce = generateNonce()
			await req.session.save()
			res.setHeader('Content-Type', 'text/plain')
			res.send(req.session.nonce)
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${String(method)} Not Allowed`)
	}
}

export default withSessionRoute(handler)
