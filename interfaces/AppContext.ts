export interface AppContext {
  authToken: string;
  setAuthToken: (authToken: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  isWeb3AuthSuccess: boolean;
  setIsWeb3AuthSuccess: (isWeb3AuthSuccess: boolean) => void;
  isWalletConnected: boolean;
  setIsWalletConnected: (isWalletConnected: boolean) => void;
}
