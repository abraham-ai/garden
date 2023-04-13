import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
// import { withIronSessionApiRoute } from 'iron-session/next'
import { withSessionRoute } from '../../../util/withSession' // sessionOptions

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	session: {
		get: (key: string) => any
		set: (key: string, value: any) => void
		unset: (key: string) => void
		save: () => Promise<void>
		destroy: () => Promise<void>
		token?: string
		userId?: string
		address?: string
		nonce?: string
	}
	body: {
		message: string
		signature: string
		userAddress: string
	}
}

interface ErrorResponse {
	errorMessage: string
}

interface LoginResponse {
	ok: boolean
	token: string
}

const handler: NextApiHandler<ApiRequest> = async (req, res): Promise<void> => {
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
		if (fields.nonce !== req.session.get('nonce')) {
			const errorResponse: ErrorResponse = { errorMessage: 'Invalid nonce.' }
			res.status(422).json(errorResponse as unknown as ApiRequest)
			return
		}

		// Verify the Ethereum signature and login the user using Eden
		const resp = await eden.loginEth(message, signature, userAddress)

		if (resp.error) {
			const errorResponse: ErrorResponse = { errorMessage: resp.error }
			console.error(resp.error)
			res.status(500).json(errorResponse as unknown as ApiRequest)
			return
		}

		// Save the user data in the session
		req.session.set('token', resp.token)
		req.session.set('userId', resp.userId)
		req.session.set('address', userAddress)
		await req.session.save()

		const loginResponse: LoginResponse = {
			ok: true,
			token: resp.token,
		}
		res.json(loginResponse as unknown as ApiRequest)
	} catch (error) {
		const errorResponse: ErrorResponse = {
			errorMessage: 'Internal Server Error',
		}
		console.error(error)
		res.status(500).json(errorResponse as unknown as ApiRequest)
	}
}

export default withSessionRoute(handler)
