import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../util/withSession';
import { eden } from '../../util/eden';

interface ApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  //   const { name } = req.query;
  const { userId } = req.body;

  console.log({ req });
  console.log(req.url);

  try {
    let collections = await eden.getCollections();
    console.log(collections);
    return res.status(200).json({ result: collections });
  } catch (error: any) {
    console.log(error);
    // if (error.response.data == 'jwt expired') {
    //   return res.status(401).json({ error: 'Authentication expired' });
    // }
    return res.status(500).json({ error: error });
  }
};

export default withSessionRoute(handler);
