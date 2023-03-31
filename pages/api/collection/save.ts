import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import Collection from '../../interfaces'

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends NextApiRequest {
  body: {
    creationId: string;
    collectionId: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  //   const { name } = req.query;
  const { collectionId, creationId } = req.body;
  const { userId, authToken } = req.session
  // console.log({ name });
  // console.log({ req });
  // console.log(req.url);
  //   console.log(req.body);

  try {
    const authTokenResult = await eden.setAuthToken(authToken);

    // get collection
    let collection = await eden.getCollection(collectionId);
    console.log(collection);

    // filter collections by collectionId
    // const currentCollection = collections.filter((collection: Collection) => collection._id === collectionId);

    // get creation
    let creation = await eden.getCreation(creationId);
    // console.log(creation)

    // add creation to collection
    let addedCreationResult = await collection.addCreation(creation)
    console.log(addedCreationResult);

    // console.log(result);
    // console.log(creations);

    return res.status(200).json(addedCreationResult);

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default withSessionRoute(handler);
