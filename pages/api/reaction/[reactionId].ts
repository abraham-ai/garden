import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../../util/withSession';

import { EdenClient } from 'eden-sdk';
const eden = new EdenClient();

interface ApiRequest extends NextApiRequest {
  body: {
    creationId: string;
    reaction: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  console.log(req);
  // const { reactionId: creationId } = req.body;
  const { reactionId: creationId } = req.query;

  console.log({ creationId });

  console.log(req.body);
  console.log(req.url);
  console.log(req.query);

  const { userId } = req.session;
  const authToken = req.session.token;

  if (!authToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const authTokenResult = await eden.setAuthToken(authToken);
    console.log(authTokenResult);

    // let profile = await eden.getProfile();
    // console.log(profile);

    const creation = await eden.getCreation(creationId);
    console.log(creation);

    const reactions = await creation.getReactions(['🙌', '🔥']);
    console.log(reactions);

    const praises = reactions?.filter((reaction) => reaction.reaction === '🙌');
    const burns = reactions?.filter((reaction) => reaction.reaction === '🔥');

    const praised =
      userId && praises?.some((reaction) => reaction.user._id === userId);
    const burned =
      userId && burns?.some((reaction) => reaction.user._id === userId);

    const result = {
      praises: praises ? praises.length : 0,
      burns: burns ? burns.length : 0,
      praised: praised,
      burned: burned,
    };

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
