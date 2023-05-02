import type Creation from './Creation'

interface CustomCollection {
	_id: string
	name: string
}

export default interface CollectionsCreations {
	collections: CustomCollection[]
	collectionsCreations: Creation[][]
	// isLoading: boolean
	// error: any
	// isValidating: boolean
}
