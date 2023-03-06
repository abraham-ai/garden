import { withIronSessionApiRoute } from 'iron-session/next';

// TYPES
import { NextApiRequest, NextApiResponse } from 'next/types';

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    req.session.destroy();

    res.setHeader(
      'Set-Cookie',
      `eden_art=${''}; Path=/; HttpOnly; Expires=${new Date().toUTCString()}`
    );
    res
      .status(200)
      .json({ success: true, isLoggedIn: false, login: '', avatarUrl: '' });
  },
  {
    cookieName: 'eden_art',
    password: process.env.COOKIE_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
);
