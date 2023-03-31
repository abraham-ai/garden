import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends NextApiRequest {
  body: {
    collectionId: string;
    newCollectionName: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { collectionId, newCollectionName } = req.body;
  const { userId, authToken } = req.session

  try {
    const authTokenResult = await eden.setAuthToken(authToken);

    // get collection
    let collection = await eden.getCollection(collectionId);
    console.log(collection);
    
    // renamte collection
    const renamedCollection = await collection.rename(newCollectionName);

    return res.status(200).json(renamedCollection);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default withSessionRoute(handler);
