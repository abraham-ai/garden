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

	creationsData: Creation[]
	setCreationsData: Dispatch<SetStateAction<Creation[]>>
	creationsLoading: boolean
	creationsMore: boolean
	// creationsLoad: () => void

	creations: Creation[]
	creationIndex: number
	setCurrentCreationIndex: Dispatch<SetStateAction<number>>
	currentCreationIndex: number
	currentCreationModalCreation: Creation
	setCurrentCreationModalCreation: Dispatch<SetStateAction<Creation>>

	collections?: Collection[]
	setCollections: Dispatch<SetStateAction<Collection[]>>
	selectedCollection: string
	setSelectedCollection: Dispatch<SetStateAction<string>>

	isSaveCreationModalOpen: boolean
	setIsSaveCreationModalOpen: Dispatch<SetStateAction<boolean>>

	collectionModalView: number
	setCollectionModalView: Dispatch<SetStateAction<number>>

	currentTheme: string
	setCurrentTheme: Dispatch<SetStateAction<string>>
}

export default AppContext
