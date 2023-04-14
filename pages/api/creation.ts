import { type NextApiRequest, type NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../util/withSession'
import { EdenClient } from 'eden-sdk'

const eden = new EdenClient()

interface ApiRequest extends NextApiRequest {
	body: {
		creationId: string
	}
}

const handler = async (
	req: ApiRequest,
	res: NextApiResponse
): Promise<void> => {
	// const { creationId: creationIdQuery } = req.query;

	const { creationId: creationIdBody } = req.body

	try {
		const creation = await eden.getCreation(creationIdBody)
		// console.log(creation);

		res.status(200).json({ creation })
		return
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error)
			res.status(500).json({ error })
		} else {
			res.status(500).json({ error: 'Unknown error' })
		}
	}
}

export default withSessionRoute(handler)
