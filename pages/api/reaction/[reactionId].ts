import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends Omit<NextApiRequest, 'query'> {
  body: {
    creationId: string;
    reaction: string;
  };
  query: {
    reactionId: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { reactionId: creationId } = req.query;

  console.log({ creationId });

  const { userId, token: authToken } = (req as any).session;

  if (!authToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const authTokenResult = await eden.setAuthToken(authToken);

    const creation = await eden.getCreation(creationId);

    const reactions = await creation.getReactions(['🙌', '🔥']);
    console.log({ reactions });

    const praises = reactions?.filter(
      (reaction: any) => reaction.reaction === '🙌'
    );
    const burns = reactions?.filter(
      (reaction: any) => reaction.reaction === '🔥'
    );

    console.log(reactions[0]?.user);
    console.log(reactions[1]?.user);

    const praised =
      userId &&
      praises?.some((reaction: any) => reaction.user.username === userId);
    const burned =
      userId &&
      burns?.some((reaction: any) => reaction.user.username === userId);

    const result = {
      praises: praises ? praises.length : 0,
      burns: burns ? burns.length : 0,
      praised: praised,
      burned: burned,
    };

    console.log(result);

    return res.status(200).json(result);
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
