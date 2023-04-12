export default interface CollectionResponse {
	collection?: {
		user?: any
		name?: string
	}
	profile?: {
		user: {
			userId: string
		}
	}
	creations?: any[]
}
