type userIdType = `0x${string}` | string | undefined;
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
}

export default AppContext;
