import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../util/withSession';
import { eden } from '../../util/eden';

interface ApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  // const { username, generators, earliestTime, latestTime, limit } = req.body;
  //   const { name } = req.query;
  const { name } = req.body;
  console.log({ name });
  // console.log({ req });
  console.log(req.url);
  //   console.log(req.body);

  try {
    let createdCollection = await eden.createCollection(name);
    let collections = await eden.getCollections();
    console.log(createdCollection);
    console.log(collections);
    const collectionName = name;
    // result = await collections.create(name);
    // const collections = await creation.getCollections(filter);

    // console.log(result);
    // console.log(creations);

    return res.status(200).json({ collectionName: name });
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
