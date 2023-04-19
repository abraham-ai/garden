import type { NextApiResponse } from 'next'
import type { ExtendedApiRequest } from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface SuccessResponse {
	message: string
	token: string
}

interface ErrorResponse {
	errorMessage: string
}

const handler = async (
	req: ExtendedApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const { message, signature, userAddress } = req.body

	console.log({ message, signature, userAddress })

	try {
		const resp = await eden.loginEth(message, signature, userAddress)

		const session = req.session
		session.token = resp.token
		session.userId = resp.userId
		session.address = userAddress

		const token = resp.token

		await req.session.save()

		const loginResponse: SuccessResponse = {
			message: 'Successfully authenticated key pair',
			token,
		}
		res.send(loginResponse)
	} catch (error: unknown) {
		const errorResponse: ErrorResponse = {
			errorMessage: 'Error authenticating key pair',
		}
		console.error(error)
		res.status(500).json(errorResponse)
	}
}

export default withSessionRoute(handler)
