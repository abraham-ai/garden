import { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()

interface ApiRequest extends Omit<NextApiRequest, 'query'> {
  body: {
    collectionId: string
  }
  query: {
    collectionId: string
  }
}

const handler = async (req: ApiRequest, res: NextApiResponse): JSX.Element => {
  const { collectionId } = req.query

  console.log({ collectionId })

  const { userId, token: authToken } = (req as any).session

  // if (typeof authToken !== 'undefined' && authToken !== null && authToken !== '') {
  //   return res.status(401).json({ error: 'Not authenticated' })
  // }

  try {
    const authTokenResult = await eden.setAuthToken(authToken)

    const collection = await eden.getCollection(collectionId)
		const profile = await eden.getProfile(userId)
    // console.log(collection)

    const creations = await eden.getCreations({ collectionId, limit: 12 })
    // console.log(creations)
    // const creations = await collection.getCreations()
    // console.log(creations)

    return res.status(200).json({ collection, creations, profile })
  } catch (error: any) {
    console.log(error)
    // if (error.response.data == 'jwt expired') {
    //   return res.status(401).json({ error: 'Authentication expired' })
    // }
    return res.status(500).json({ error })
    // error.response.data
  }
}

export default withSessionRoute(handler)
