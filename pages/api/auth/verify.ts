import { NextApiRequest, NextApiResponse } from 'next/types'
import { SiweMessage } from 'siwe'

import { withIronSessionApiRoute } from 'iron-session/next'
import { withSessionRoute, sessionOptions } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		message: string
		signature: string
		userAddress: string
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	const { method } = req
	switch (method) {
		case 'POST':
			// console.log('POST!');
			// console.log(req.body);
			try {
				const message = req.body.message
				const signature = req.body.signature
				const userAddress = req.body.userAddress

				const resp = await eden.loginEth(message, signature, userAddress)
        console.log("THE REPS!")
				console.log(resp);

				if (resp.error) {
					console.info(resp.error)
					return res.status(500).json({ error: resp.error })
				}

				const siweMessage = new SiweMessage(message)
				const fields = await siweMessage.validate(signature)

				if (fields.nonce !== req.session.nonce)
					return res.status(422).json({ message: 'Invalid nonce.' })

				// req.session.siwe = fields;

				req.session.token = resp.token;
				req.session.userId = resp.userId;
        req.session.address = userAddress;

				const token = resp.token

				await req.session.save()

				res.json({ ok: true, token: token })
			} catch (_error) {
				res.json({ ok: false })
			}
			break
		default:
			res.setHeader('Allow', ['POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}

export default withSessionRoute(handler)
