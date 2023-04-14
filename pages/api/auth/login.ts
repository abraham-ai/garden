import type { NextApiHandler, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'
import type { IronSessionData, ApiRequest } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

// interface ApiRequest extends NextApiRequest {
// 	body: {
// 		message: string
// 		signature: string
// 		userAddress: string
// 	}
// }

interface SuccessResponse {
	message: string
	token: string
}

interface ErrorResponse {
	errorMessage: string
}

const handler: NextApiHandler<
	ApiRequest & { session: IronSessionData }
> = async (req, res): Promise<void> => {
	const { message, signature, userAddress } = req.body

	try {
		const resp = await eden.loginEth(message, signature, userAddress)

		const session = req.session as unknown as IronSessionData
		session.set('token', resp.token)
		session.set('userId', resp.userId)
		session.set('address', userAddress)

		const token = resp.token

		await req.session.save()

		const loginResponse: SuccessResponse = {
			message: 'Successfully authenticated key pair',
			token,
		}
		res.send(loginResponse as unknown as ApiRequest)
	} catch (error: unknown) {
		const errorResponse: ErrorResponse = {
			errorMessage: 'Error authenticating key pair',
		}
		console.error(error)
		res.status(500).json(errorResponse as unknown as ApiRequest)
	}
}

export default withSessionRoute(handler)
