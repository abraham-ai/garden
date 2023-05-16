import type { FC } from 'react'
import type Creation from '../interfaces/Creation'
import type Collection from '../interfaces/Collection'

import React, { useState, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { ReactionProvider } from '../context/ReactionContext'

import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {
	WagmiConfig,
	createClient,
	configureChains,
	mainnet,
	useAccount,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import axios from 'axios'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import Blockies from 'react-blockies'

import themeOnLoad from '../util/themeOnLoad'

import { ConfigProvider, theme } from 'antd'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import emptyCreation from '../constants/emptyCreation'
import emptyCollection from '../constants/emptyCollection'

const { chains, provider } = configureChains(
	[mainnet],
	[
		alchemyProvider({
			apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
		}),
		publicProvider(),
	]
)
const { connectors } = getDefaultWallets({
	appName: 'Eden Art AI',
	chains,
})

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

interface CustomAvatarProps {
	address: string
}

const CustomAvatar: FC<CustomAvatarProps> = ({ address }) => {
	return <Blockies seed={address} />
}

const now = new Date()
now.setMinutes(now.getMinutes() - 1)
const initialLatestTime = String(now.toISOString())

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	// wagmi wallet hooks
	const { isConnected, address } = useAccount()

	// auth context
	const [isWalletConnected, setIsWalletConnected] = useState<
		boolean | undefined
	>(undefined)
	const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(false)
	const [authToken, setAuthToken] = useState<string | undefined>('')
	const [userId, setUserId] = useState<string | undefined>('')
	const [userAddress, setUserAddress] = useState<string | undefined>('')
	const [firstSignInRequest, setFirstSignInRequest] = useState<boolean>(true)
	const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false)

	// creation context
	const [creationsData, setCreationsData] = useState<Creation[]>([])
	const [creationsLoading] = useState<boolean>(false) // setCreationsLoading
	const [creationsMore] = useState<boolean>(true) // setCreationsMore

	const [earliestCreationTime, setEarliestCreationTime] = useState<
		number | string
	>('')
	const [latestCreationTime, setLatestCreationTime] = useState<number | string>(
		''
	)

	const [isSaveCreationModalOpen, setIsSaveCreationModalOpen] = useState(false)
	const [currentCreationModalCreation, setCurrentCreationModalCreation] =
		useState<Creation>(emptyCreation)

	const [currentCreationIndex, setCurrentCreationIndex] = useState<number>(0)

	// collection context
	const [collections, setCollections] = useState<Collection[]>([])
	const [selectedCollection, setSelectedCollection] = useState<string>('')
	const [currentModalCollection, setCurrentModalCollection] =
		useState<Collection>(emptyCollection)
	const [collectionModalView, setCollectionModalView] = useState<string>('')
	const [isCollectionModalOpen, setIsCollectionModalOpen] =
		useState<boolean>(false)

	const [currentTheme, setCurrentTheme] = useState<string>('')

	// creation context function
	const onCreationClick = (creation, index): void => {
		setCurrentCreationModalCreation(creation)
		setCurrentCreationIndex(index)
	}

	// creations context function
	const updateCreationsData = (newData: Creation[]): void => {
		const uniqueCreations = newData.filter((newCreation: Creation) => {
			return !creationsData.some(
				(prevCreation) => prevCreation._id === newCreation._id
			)
		})

		if (uniqueCreations.length > 0) {
			setCreationsData((prevCreations: Creation[]) => {
				return [...prevCreations, ...uniqueCreations]
			})
		}
	}

	// collections context function
	const handleCollectionAction = async (
		actionType: 'create' | 'rename' | 'delete',
		collectionId: string | null,
		collectionName: string | null
	): Promise<void> => {
		console.log({ collectionId })
		console.log({ collectionName })
		try {
			let endpoint = ''
			let requestData = {}

			if (actionType === 'create') {
				endpoint = '/api/collection/create'
				requestData = {
					collectionName,
				}
			} else if (actionType === 'rename') {
				endpoint = '/api/collection/rename'
				requestData = {
					collectionId,
					newCollectionName: collectionName,
				}
			} else if (actionType === 'delete') {
				endpoint = '/api/collection/delete'
				requestData = {
					collectionId,
					collectionName,
				}
			} else {
				throw new Error('Invalid action type')
			}

			const { data } = await axios.post(endpoint, requestData)

			console.log(data)

			if (actionType === 'create') {
				console.log(`APP: setCollections ${actionType}`)
				setCollections(() => [...data.updatedCollections])
			} else if (actionType === 'delete' || actionType === 'rename') {
				console.log(`APP: setCollections ${actionType}`)
				setCollections(() => [...data.updatedCollections])
			}
		} catch (error) {
			console.error(`Error in ${actionType} collection:`, error)
		}
	}

	const contextValues = {
		authToken,
		setAuthToken,
		isWalletConnected,
		setIsWalletConnected,
		isSignedIn,
		setIsSignedIn,
		userId,
		setUserId,
		userAddress,
		setUserAddress,
		creationsLoading,
		creationsData,
		setCreationsData,
		updateCreationsData,
		onCreationClick,
		creationsMore,
		earliestCreationTime,
		setEarliestCreationTime,
		latestCreationTime,
		setLatestCreationTime,
		currentCreationIndex,
		setCurrentCreationIndex,
		collections,
		setCollections,
		selectedCollection,
		setSelectedCollection,
		collectionModalView,
		setCollectionModalView,
		isCollectionModalOpen,
		setIsCollectionModalOpen,
		currentModalCollection,
		setCurrentModalCollection,
		isSaveCreationModalOpen,
		setIsSaveCreationModalOpen,
		currentTheme,
		setCurrentTheme,
		firstSignInRequest,
		setFirstSignInRequest,
		isSignInModalOpen,
		setIsSignInModalOpen,
		creations: [] as unknown as [],
		creationIndex: 0,
		currentCreationModalCreation,
		setCurrentCreationModalCreation,
		handleCollectionAction,
	}

	const { defaultAlgorithm, darkAlgorithm } = theme

	// routing progress bar
	useEffect(() => {
		Router.events.on('routeChangeStart', nProgress.start)
		Router.events.on('routeChangeError', nProgress.done)
		Router.events.on('routeChangeComplete', nProgress.done)

		return () => {
			Router.events.off('routeChangeStart', nProgress.start)
			Router.events.off('routeChangeError', nProgress.done)
			Router.events.off('routeChangeComplete', nProgress.done)
		}
	}, [])

	const currentThemeOnLoad = themeOnLoad()
	// console.log({ currentThemeOnLoad })

	const isThemeLight = currentTheme === 'light'

	useEffect(() => {
		setIsWalletConnected(isConnected)
		setUserId(address?.toString() ?? '')
	}, [isConnected, setIsWalletConnected, address, setUserId, userId])

	useEffect(() => {
		setCurrentTheme(currentThemeOnLoad)
	}, [currentThemeOnLoad])

	return (
		<>
			<AppContext.Provider value={contextValues}>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider avatar={CustomAvatar} chains={chains}>
						<ReactionProvider>
							<ConfigProvider
								theme={{
									algorithm: isThemeLight ? defaultAlgorithm : darkAlgorithm,
								}}
							>
								<Component {...pageProps} />
							</ConfigProvider>
						</ReactionProvider>
					</RainbowKitProvider>
				</WagmiConfig>
			</AppContext.Provider>
		</>
	)
}
