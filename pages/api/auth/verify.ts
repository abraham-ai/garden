import type { NextApiHandler, NextApiRequest } from 'next'
import { SiweMessage } from 'siwe'
import type { Session, IronSession } from 'iron-session'
import { withSessionRoute } from '../../../util/withSession' // sessionOptions
import type { IronSessionData } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

export interface ExtendedSession extends Session, IronSessionData {
	get: (key: string) => any
	set: (key: string, value: any) => void
	unset: (key: string) => void
	save: () => Promise<void>
	destroy: () => Promise<void>
}

interface ApiRequest extends NextApiRequest {
	session: ExtendedSession
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
		if (fields.nonce !== (req.session as ExtendedSession).get('nonce')) {
			const errorResponse: ErrorResponse = { errorMessage: 'Invalid nonce.' }
			res.status(422).json(errorResponse as unknown as ApiRequest)
			return
		}

		// Verify the Ethereum signature and login the user using Eden
		const resp = await eden.loginEth(message, signature, userAddress)

		if (resp.error !== undefined) {
			const errorResponse: ErrorResponse = { errorMessage: resp.error }
			console.error(resp.error)
			res.status(500).json(errorResponse as unknown as ApiRequest)
			return
		}

		// Save the user data in the session
		const session = req.session as ExtendedSession
		session.set('token', resp.token)
		session.set('userId', resp.userId)
		session.set('address', userAddress)
		await session.save()

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
