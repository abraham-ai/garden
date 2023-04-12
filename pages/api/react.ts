import { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		creationId: string
		reaction: string
    unreact: boolean
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	const { creationId, reaction, unreact } = req.body;
	// const { userId } = req.session
	const authToken = req.session.token;

	if (!authToken) {
		return res.status(401).json({ error: 'Not authenticated' })
	}

	try {
		await eden.setAuthToken(authToken);
		const creation = await eden.getCreation(creationId);
    if (unreact) {
      const result = await creation.unreact(reaction);
      return res.status(200).json({ result });
    } 
    else {
      const result = await creation.react(reaction);
      return res.status(200).json({ result });
    }
	} catch (error: any) {
		// console.log(error)
		return res.status(500).json(error)
		// { error: error.response.data }
	}
}

export default withSessionRoute(handler)
