import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../util/withSession';
import { EdenClient } from 'eden-sdk';

const eden = new EdenClient();

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
  const { page, limit, username, generators, earliestTime, latestTime } =
    req.query;

  // console.log({ req });
  // console.log(req.url);
  // console.log(req.body);
  // console.log({
  //   page,
  //   username,
  //   generators,
  //   earliestTime,
  //   latestTime,
  //   limit,
  // });

  try {
    const filter = { limit: limit };
    Object.assign(filter, username !== 'null' ? { username: username } : {});
    Object.assign(
      filter,
      generators !== 'null' ? { generators: generators } : {}
    );
    Object.assign(
      filter,
      earliestTime !== 'null' ? { earliestTime: earliestTime } : {}
    );
    Object.assign(
      filter,
      latestTime !== 'null' ? { latestTime: latestTime } : {}
    );
    Object.assign(filter, limit ? { limit: limit } : {});

    // console.log({ filter });
    const creations = await eden.getCreations(filter);

    // console.log(creations.length);
    // console.log(creations);

    return res.status(200).json(creations);
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
