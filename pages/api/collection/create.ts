import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends NextApiRequest {
  body: {
    collectionName: string;
    creationId: string
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { collectionName, creationId } = req.body;
  const { userId, token: authToken } = req.session

  try {
    const authTokenResult = await eden.setAuthToken(authToken);

    // create collection
    let createdCollection = await eden.createCollection(collectionName);
    let collections = await eden.getCollections(userId);
    console.log(createdCollection);
    console.log(collections);
    
    // get creation
    let creation = await eden.getCreation(creationId);

    // add creation to collection
    let addedCreationResult = await createdCollection.addCreation(creation)
    console.log(addedCreationResult);
    
    // result = await collections.create(name);
    // const collections = await creation.getCollections(filter);

    // console.log(result);
    // console.log(creations);

    return res.status(200).json({ collectionName: collectionName });
  } catch (error: any) {
    console.log(error);
    // if (error.response.data == 'jwt expired') {
    //   return res.status(401).json({ error: 'Authentication expired' });
    // }
    return res.status(500).json({ error: error });
    // error.response.data
  }
};

export default withSessionRoute(handler);
