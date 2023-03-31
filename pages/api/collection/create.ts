import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  // const { username, generators, earliestTime, latestTime, limit } = req.body;
  //   const { name } = req.query;
  const { name: collectionName, creationId } = req.body;
  const { userId, authToken } = req.session
  // console.log({ name });
  // console.log({ req });
  // console.log(req.url);
  //   console.log(req.body);

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