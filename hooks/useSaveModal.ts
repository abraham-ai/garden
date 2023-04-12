import { useState } from 'react'
import axios from 'axios'
import type Collection from '../interfaces/Collection'

export default function useModalLogic() {
	const [modalOpen, setModalOpen] = useState(false)
	const [modalView, setModalView] = useState(1)
	const [collections, setCollections] = useState<Collection[]>([])

	const handleModalCleanUp = () => {
		setModalOpen(false)
		setModalView(1)
	}

	const handleCreateCollection = async (
		inputCollectionName: string
	): Promise<void> => {
		const { data } = await axios.post('/api/collection/save', {
			name: inputCollectionName,
		})

		const newCollection: Collection = data.result

		console.log({ data })

		setCollections([...collections, newCollection])
		handleModalCleanUp()
	}

	return {
		modalOpen,
		setModalOpen,
		modalView,
		setModalView,
		collections,
		handleCreateCollection,
	}
}
