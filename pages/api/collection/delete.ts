import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends NextApiRequest {
  body: {
    collectionId: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { collectionId } = req.body;
  const { userId, authToken } = req.session

  try {
    const authTokenResult = await eden.setAuthToken(authToken);

    // create collection
    let collection = await eden.getCollection(collectionId);
    console.log(collection);

    // delete collection
    let deletedCollectionResult = await collection.delete()
    console.log(deletedCollectionResult);

    return res.status(200).json(deletedCollectionResult);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default withSessionRoute(handler);
