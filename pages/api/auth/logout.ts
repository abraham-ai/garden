import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../util/withSession'

import type { NextApiRequest, NextApiResponse } from 'next/types'

export default withIronSessionApiRoute(
	async (req: NextApiRequest, res: NextApiResponse) => {
		req.session.destroy()

		res.setHeader(
			'Set-Cookie',
			`eden_art=${''}; Path=/; HttpOnly; Expires=${new Date().toUTCString()}`
		)
		res
			.status(200)
			.json({ success: true, isLoggedIn: false, login: '', avatarUrl: '' })
	},
	sessionOptions
)
