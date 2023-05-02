import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
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
import type Creation from '../interfaces/Creation'
import type Collection from '../interfaces/Collection'
import type Task from '../interfaces/Task'
import type Config from '../interfaces/Config'

import { ConfigProvider, theme } from 'antd'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

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

const initialTask: Task = {
	_id: '',
	taskId: '',
	config: {
		height: 100,
		width: 100,
		guidance_scale: 1,
		init_image_data: '',
		init_image_strength: 1,
		n_samples: 10,
		sampler: '',
		seed: 1,
		steps: 10,
		stream: true,
		stream_every: 1,
		text_input: '',
		uc_text: true,
		upscale_f: 1,
	},
	generator: {
		_id: '',
		generatorName: '',
	},
	status: '',
	key: 0,
	address: '',
	uri: '',
	timestamp: '',
	prompt: '',
	progress: 0,
}

const initialConfig: Config = {
	height: 100,
	width: 100,
	guidance_scale: 1,
	init_image_data: '',
	init_image_strength: 1,
	n_samples: 10,
	sampler: '',
	seed: 1,
	steps: 10,
	stream: true,
	stream_every: 1,
	text_input: '',
	uc_text: true,
	upscale_f: 1,
}

const emptyCreation = {
	key: '',
	_id: '',
	task: initialTask,
	config: initialConfig,
	user: '',
	createdAt: '',
	address: '',
	uri: '',
	timestamp: '',
	prompt: '',
	status: '',
	thumbnail: '',
}

const emptyCollection: Collection = {
	_id: '',
	name: '',
}

interface CustomAvatarProps {
	address: string
}

const CustomAvatar: FC<CustomAvatarProps> = ({ address }) => {
	return <Blockies seed={address} />
}

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
	const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false)

	// creation context
	const [creationsData, setCreationsData] = useState<Creation[]>([])
	const [creationsLoading] = useState<boolean>(false) // setCreationsLoading
	const [creationsMore] = useState<boolean>(true) // setCreationsMore

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
		creationsMore,
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
		currentCreationModalCreation,
		setCurrentCreationModalCreation,
		currentModalCollection,
		setCurrentModalCollection,
		isSaveCreationModalOpen,
		setIsSaveCreationModalOpen,
		currentTheme,
		setCurrentTheme,
		isSignInModalOpen,
		setIsSignInModalOpen,

		handleCollectionAction,
	}

	const { defaultAlgorithm, darkAlgorithm } = theme

	// routing progress bar
	Router.events.on('routeChangeStart', nProgress.start)
	Router.events.on('routeChangeError', nProgress.done)
	Router.events.on('routeChangeComplete', nProgress.done)

	const currentThemeOnLoad = themeOnLoad()

	// console.log({ currentThemeOnLoad })

	useEffect(() => {
		setIsWalletConnected(isConnected)
		setUserId(address?.toString() ?? '')
	}, [isConnected, setIsWalletConnected, address, setUserId, userId])

	useEffect(() => {
		setCurrentTheme(currentThemeOnLoad)
	}, [currentThemeOnLoad])

	return (
		<>
			<AppContext.Provider
				value={{
					...contextValues,
					creations: [] as unknown as [],
					creationIndex: 0,
					collections,
					setCollections,
					selectedCollection,
					setSelectedCollection,
					collectionModalView,
					setCollectionModalView,
					currentCreationModalCreation,
					setCurrentCreationModalCreation,
					isSaveCreationModalOpen,
					setIsSaveCreationModalOpen,
					isSignInModalOpen,
					setIsSignInModalOpen,
				}}
			>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider avatar={CustomAvatar} chains={chains}>
						<ReactionProvider>
							<ConfigProvider
								theme={{
									algorithm:
										currentTheme === 'light' ? defaultAlgorithm : darkAlgorithm,
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
