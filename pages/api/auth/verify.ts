import type { NextApiHandler, NextApiResponse } from 'next'
import type {
	ExtendedApiRequest,
	IronSessionData,
} from '../../../util/withSession'
import { withSessionRoute } from '../../../util/withSession'
import { SiweMessage } from 'siwe'
import { EdenClient } from 'eden-sdk'

const eden = new EdenClient()

interface ErrorResponse {
	errorMessage: string
}

interface LoginResponse {
	ok: boolean
	token: string
}

const handler: NextApiHandler<ExtendedApiRequest> = async (
	req,
	res: NextApiResponse
): Promise<void> => {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${String(req.method)} Not Allowed`)
		return
	}

	const { message, signature, userAddress } = req.body

	try {
		// Verify the message signature using Siwe
		const siweMessage = new SiweMessage(message)
		const fields = await siweMessage.validate(signature)

		// Verify the nonce
		if (
			fields.nonce !== (req.session as unknown as IronSessionData).get('nonce')
		) {
			const errorResponse: ErrorResponse = { errorMessage: 'Invalid nonce.' }
			res.status(422).json(errorResponse as unknown as ExtendedApiRequest)
			return
		}

		// Verify the Ethereum signature and login the user using Eden
		const resp = await eden.loginEth(message, signature, userAddress)

		if (resp.error !== undefined) {
			const errorResponse: ErrorResponse = { errorMessage: resp.error }
			console.error(resp.error)
			res.status(500).json(errorResponse as unknown as ExtendedApiRequest)
			return
		}

		// Save the user data in the session
		const session = req.session as unknown as IronSessionData
		session.set('token', resp.token)
		session.set('userId', resp.userId)
		session.set('address', userAddress)

		session.save()

		const loginResponse: LoginResponse = {
			ok: true,
			token: resp.token,
		}
		res.json(loginResponse as unknown as ExtendedApiRequest)
	} catch (error) {
		const errorResponse: ErrorResponse = {
			errorMessage: 'Internal Server Error',
		}
		console.error(error)
		res.status(500).json(errorResponse as unknown as ExtendedApiRequest)
	}
}

export default withSessionRoute(handler)
