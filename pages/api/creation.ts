import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'
import { EdenClient } from 'eden-sdk'

const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		creationId: string
	}
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
	// const { creationId: creationIdQuery } = req.query;

	const { creationId: creationIdBody } = req.body

	try {
		const creation = await eden.getCreation(creationIdBody)
		// console.log(creation);

		res.status(200).json({ creation })
		return
	} catch (error: any) {
		console.log(error)
		// if (error.response.data == 'jwt expired') {
		//   return res.status(401).json({ error: 'Authentication expired' });
		// }
		res.status(500).json({ error })
		// error.response.data
	}
}

export default withSessionRoute(handler)
