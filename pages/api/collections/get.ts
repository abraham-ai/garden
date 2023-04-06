import { NextApiRequest, NextApiResponse } from 'next/types'
import { withSessionRoute } from '../../../util/withSession'

import { EdenClient } from 'eden-sdk'
const eden = new EdenClient()


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { name } = req.query
  const { name: userId, token: authToken } = req.session

  // console.log({ req })
  console.log(req.url)

  try {
    const authTokenResult = await eden.setAuthToken(authToken)
    const collections = await eden.getCollections(userId)
    // console.log(collections)

    return res.status(200).json({ result: collections })
  } catch (error: any) {
    console.log(error)
    // if (error.response.data == 'jwt expired') {
    //   return res.status(401).json({ error: 'Authentication expired' })
    // }
    return res.status(500).json({ error })
  }
}

export default withSessionRoute(handler)
