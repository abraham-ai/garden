import type { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends Omit<NextApiRequest, 'query'> {
  body: {
    creatorId: string
  }
  query: {
    creatorId: string
  }
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { creatorId: queryCreatorId } = req.query
	const { creatorId } = req.body
	const { userId, token: authToken } = (req as any).session

  console.log({ queryCreatorId })
	console.log({ creatorId })
	console.log({ authToken })


	// if (typeof authTokenResult === 'undefined') {
  //   return res.status(401).json({ error: 'Not authenticated' });
  // }


  // if (!authToken) {
  //   return res.status(401).json({ error: 'Not authenticated' });
  // }

  try {
		const filter = {}
    Object.assign(filter, creatorId !== 'null' ? { username: '0x49fbd13846F2428c148A4c165a22b4fFA54263a4' } : {})
    // Object.assign(
    //   filter,
    //   generators !== 'null' ? { generators: generators } : {}
    // );
    // Object.assign(
    //   filter,
    //   earliestTime !== 'null' ? { earliestTime: earliestTime } : {}
    // );
    // Object.assign(
    //   filter,
    //   latestTime !== 'null' ? { latestTime: latestTime } : {}
    // );
    Object.assign(filter, { limit: 10 })
		console.log({ filter })
    
		const authTokenResult = await eden.setAuthToken(authToken)
		console.log(authTokenResult)

    // if (typeof authTokenResult !== 'undefined') {
			const creations = await eden.getCreations(filter)
			console.log(creations.length)
			console.log(creations)
			return res.status(200).json(creations)
    // }
    // return res.status(200).json(null)
  } catch (error: any) {
    console.log(error)
    // if (error.response.data == 'jwt expired') {
    //   return res.status(401).json({ error: 'Authentication expired' });
    // }
    return res.status(500).json({ error })
    // error.response.data
  }
}

export default withSessionRoute(handler)
