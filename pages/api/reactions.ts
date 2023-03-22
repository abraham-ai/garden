import { NextApiRequest, NextApiResponse } from 'next/types';
import { withSessionRoute } from '../../util/withSession';
import { eden } from '../../util/eden';

interface ApiRequest extends NextApiRequest {
  body: {
    creationId: string;
    reaction: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { creationId, reaction } = req.body;
  const { token, userId } = req.session;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const creation = await eden.getCreation(creationId);
    const reactions = await creation.getReactions(['👍', '🔥']);
    return res.status(200).json(reactions);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.response.data });
  }
};

export default withSessionRoute(handler);
