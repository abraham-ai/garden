// TYPES
import { NextApiRequest, NextApiResponse } from 'next/types';

// SESSION
import { withSessionRoute } from '../../../util/withSession';

// LIBS
import { eden } from '../../../util/eden';

interface ApiRequest extends NextApiRequest {
  body: {
    message: string;
    signature: string;
    userAddress: string;
  };
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { message, signature, userAddress } = req.body;

  console.log({ message, signature, userAddress });

  try {
    const resp = await eden.loginEth(message, signature, userAddress);

    console.log(resp);

    req.session.token = resp.token;
    req.session.userId = userAddress;

    const token = resp.token;

    console.log({ token });

    await req.session.save();

    res.send({
      message: 'Successfully authenticated key pair',
      token: token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Error authenticating key pair' });
  }
};

export default withSessionRoute(handler);
