import type Creation from './Creation'
import type Collection from './Collection'

export type userIdType = `${string}` | string | undefined
type SetStateAction<S> = S | ((prevState: S) => S)
type Dispatch<A> = (action: A) => void

interface AppContext {
	authToken?: string
	setAuthToken: Dispatch<SetStateAction<string | undefined>>

	userId?: userIdType
	setUserId: Dispatch<SetStateAction<userIdType>>
	userAddress?: userIdType
	setUserAddress: Dispatch<SetStateAction<string>>

	isSignedIn?: boolean
	setIsSignedIn: Dispatch<SetStateAction<boolean | undefined>>
	isWalletConnected?: boolean
	setIsWalletConnected: Dispatch<SetStateAction<boolean | undefined>>
	isSignInModalOpen: boolean
	setIsSignInModalOpen: Dispatch<SetStateAction<boolean>>
	firstSignInRequest: boolean
	setFirstSignInRequest: Dispatch<SetStateAction<boolean>>

	creationsData: Creation[]
	setCreationsData: Dispatch<SetStateAction<Creation[]>>
	creationsLoading: boolean
	creationsMore: boolean
	earliestCreationTime: string | number
	setEarliestCreationTime: Dispatch<SetStateAction<string | number>>
	latestCreationTime: string | number
	setLatestCreationTime: Dispatch<SetStateAction<string | number>>
	updateCreationsData: (data: Creation[]) => void
	// creationsLoad: () => void

	creations: Creation[]
	creationIndex: number
	setCurrentCreationIndex: Dispatch<SetStateAction<number>>
	currentCreationIndex: number
	currentCreationModalCreation: Creation
	setCurrentCreationModalCreation: Dispatch<SetStateAction<Creation>>
	onCreationClick: (creation: Creation, index: number) => void

	collections?: Collection[]
	setCollections: Dispatch<SetStateAction<Collection[]>>
	selectedCollection: string
	setSelectedCollection: Dispatch<SetStateAction<string>>

	isSaveCreationModalOpen: boolean
	setIsSaveCreationModalOpen: Dispatch<SetStateAction<boolean>>

	collectionModalView: string
	setCollectionModalView: Dispatch<SetStateAction<string>>

	isCollectionModalOpen: boolean
	setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>

	currentModalCollection: Collection
	setCurrentModalCollection: Dispatch<SetStateAction<Collection>>

	handleCollectionAction: (
		actionType: 'create' | 'rename' | 'delete',
		collectionId: string | null,
		collectionName: string | null
	) => Promise<void>

	currentTheme: string
	setCurrentTheme: Dispatch<SetStateAction<string>>
}

export default AppContext
