import type { NextApiResponse } from 'next'
import type { ExtendedApiRequest } from '../../../util/withSession'
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

const handler: (
  req: ExtendedApiRequest,
  res: NextApiResponse
) => Promise<void> = async (req, res: NextApiResponse): Promise<void> => {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${String(req.method)} Not Allowed`)
		return
	}

	console.log(req.method)

	const { message, signature, userAddress } = req.body

	try {
		// Verify the message signature using Siwe
		const siweMessage = new SiweMessage(message)
		const fields = await siweMessage.validate(signature)

		// Verify the nonce
		if (fields.nonce !== req.session.nonce) {
			const errorResponse: ErrorResponse = { errorMessage: 'Invalid nonce.' }
			res.status(422).json(errorResponse)
			return
		}

		// Verify the Ethereum signature and login the user using Eden
		const resp = await eden.loginEth(message, signature, userAddress)

		if (resp.error !== undefined) {
			const errorResponse: ErrorResponse = { errorMessage: resp.error }
			console.error(resp.error)
			res.status(500).json(errorResponse)
			return
		}

		// Save the user data in the session
		const session = req.session
		session.token = resp.token
		session.userId = resp.userId
		session.address = userAddress

		await session.save()

		const loginResponse: LoginResponse = {
			ok: true,
			token: resp.token
		}
		res.json(loginResponse)
	} catch (error) {
		const errorResponse: ErrorResponse = {
			errorMessage: 'Internal Server Error'
		}
		console.error(error)
		res.status(500).json(errorResponse)
	}
}

export default withSessionRoute(handler)
