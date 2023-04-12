import type Collection from './Collection'

export default interface CollectionsResponse {
	result: Collection[]
	isLoading: boolean
	error: any
}
