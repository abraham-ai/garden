import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
	NextApiRequest,
} from 'next/types'
import type { Session } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

declare const process: {
	env: {
		NODE_ENV: string
		NEXT_PUBLIC_COOKIE_SECRET: string
	}
}

export type IronSessionData = Session & {
	token?: string
	address?: string
	userId?: string
	username?: string
	nonce?: string
}

export type ExtendedApiRequest = NextApiRequest & {
	session: IronSessionData
}

export const sessionOptions = {
	password: process.env.NEXT_PUBLIC_COOKIE_SECRET ?? '',
	cookieName: 'eden_art',
	ttl: 15 * 24 * 3600,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export function withSessionRoute(
	handler: (req: ExtendedApiRequest, res: NextApiResponse) => Promise<void>
): NextApiHandler {
	const wrappedHandler: NextApiHandler = withIronSessionApiRoute(
		async (req, res) => {
			await handler(req as ExtendedApiRequest, res)
		},
		sessionOptions
	)
	return wrappedHandler
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
	P extends Record<string, unknown> = Record<string, unknown>
>(
	handler: (
		context: GetServerSidePropsContext
	) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
): (
	context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<P>> {
	return withIronSessionSsr(handler, sessionOptions)
}
