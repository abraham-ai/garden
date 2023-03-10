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
  const { username, generators, earliestTime, latestTime, limit } = req.body;

  console.log(req.body);

  try {
    const filter = {};
    Object.assign(filter, username ? { username: username } : {});
    Object.assign(filter, generators ? { generators: generators } : {});
    Object.assign(filter, earliestTime ? { earliestTime: earliestTime } : {});
    Object.assign(filter, latestTime ? { latestTime: latestTime } : {});
    Object.assign(filter, limit ? { limit: limit } : {});
    const creations = await eden.getCreations(filter);

    console.log(creations.length);
    console.log({ creations });

    return res.status(200).json({ creations: creations });
  } catch (error: any) {
    if (error.response.data == 'jwt expired') {
      return res.status(401).json({ error: 'Authentication expired' });
    }
    return res.status(500).json({ error: error.response.data });
  }
};

export default withSessionRoute(handler);
