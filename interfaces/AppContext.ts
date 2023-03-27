import Creation from './Creation'

export type userIdType = `0x${string}` | string | undefined;
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (action: A) => void;

interface AppContext {
  authToken?: string;
  setAuthToken: Dispatch<SetStateAction<string | undefined>>;
  userId?: userIdType;
  setUserId: Dispatch<SetStateAction<userIdType>>;
  isSignedIn?: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean | undefined>>;
  isWalletConnected?: boolean;
  setIsWalletConnected: Dispatch<SetStateAction<boolean | undefined>>;

  creationsData: object[];
  setCreationsData: Dispatch<SetStateAction<object[]>>;
  creationsLoading: boolean;
  creationsMore: boolean;
  creationsLoad: () => void;

  creations: Creation[];
  creationIndex: number;
  setCurrentCreationIndex: Dispatch<SetStateAction<number>>;
  currentCreationIndex: number;

  collections?: any[];
  setCollections: Dispatch<SetStateAction<any[]>>;
  selectedCollection: string;
  setSelectedCollection: Dispatch<SetStateAction<string>>;
  
  collectionModalView: React.ReactNode;
  setCollectionModalView: Dispatch<SetStateAction<number>>;
}

export default AppContext;
