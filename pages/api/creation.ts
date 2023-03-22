import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../util/withSession';
import { eden } from '../../util/eden';

interface ApiRequest extends NextApiRequest {
  body: {
    username: string;
    generators: string[];
    earliestTime: number;
    latestTime: number;
    limit: number;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  // const { username, generators, earliestTime, latestTime, limit } = req.body;
  const { creationId: creationIdQuery } = req.query;
  const { creationId: creationIdBody } = req.body;

  console.log({ creationIdBody });
  console.log({ creationIdQuery });

  // console.log({ req });
  console.log(req.url);
  // console.log(req.body);

  try {
    const creation = await eden.getCreation(creationId);
    // console.log(creation);

    return res.status(200).json({ creation: creation });
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
