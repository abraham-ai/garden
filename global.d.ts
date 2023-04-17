// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare module NodeJS {
	interface ProcessEnv {
		NODE_ENV: string
		NEXT_PUBLIC_COOKIE_SECRET?: string
	}
}
