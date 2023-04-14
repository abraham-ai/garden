import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
	NextApiRequest,
} from 'next/types'

import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import type { IronSession } from 'iron-session' // Session as IronSessionData
import 'iron-session'

declare const process: {
	env: {
		NODE_ENV: string
		NEXT_PUBLIC_COOKIE_SECRET: string
	}
}

export interface ApiRequest extends NextApiRequest, IronSession {
	session: Session & {
		set: (key: string, value: any) => void
	}
	body: {
		message: string
		signature: string
		userAddress: string
	}
}

export interface IronSessionData {
	token?: string
	address?: string
	userId?: string
	username?: string
	nonce?: string
	get: (key: string) => any
	set: (key: string, value: any) => void
	unset: (key: string) => void
	save: () => void
}

declare module 'iron-session' {
	interface Session {
		data: IronSessionData
	}
}

export const sessionOptions = {
	password: process.env.NEXT_PUBLIC_COOKIE_SECRET ?? '',
	cookieName: 'eden_art',
	ttl: 15 * 24 * 3600,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

// export function withSessionRoute(handler: NextApiHandler): NextApiHandler {
// 	return withIronSessionApiRoute(handler, sessionOptions)
// }

export function withSessionRoute(
	handler: NextApiHandler<ApiRequest>
): NextApiHandler<ApiRequest> {
	return withIronSessionApiRoute(handler, sessionOptions)
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
