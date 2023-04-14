import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'
import type { IronSessionData } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		message: string
		signature: string
		userAddress: string
	}
}

const handler = async (
	req: ApiRequest & { session: IronSessionData },
	res: NextApiResponse
): Promise<void> => {
	const { message, signature, userAddress } = req.body

	try {
		const resp = await eden.loginEth(message, signature, userAddress)

		req.session.set('token', resp.token)
		req.session.set('userId', resp.userId)
		req.session.set('address', userAddress)

		const token = resp.token

		await req.session.save()

		res.send({
			message: 'Successfully authenticated key pair',
			token,
		})
	} catch (error: unknown) {
		console.error(error)
		res.status(500).json({ error: 'Error authenticating key pair' })
	}
}

export default withSessionRoute(handler)
