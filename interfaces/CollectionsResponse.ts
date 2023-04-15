import type Collection from './Collection'

export default interface CollectionsResponse {
	collections: Collection[]
	isLoading: boolean
	error: any
	isValidating: boolean
}
