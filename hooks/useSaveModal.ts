import { useState } from 'react'
import axios from 'axios'

export default function useModalLogic() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalView, setModalView] = useState(1)
  const [collections, setCollections] = useState([])

  const handleModalCleanUp = () => {
    setModalOpen(false)
    setModalView(1)
  }

  const handleCreateCollection = async (inputCollectionName) => {
    const { data } = await axios.post('/api/collection/save', {
      name: inputCollectionName
    })

    console.log({ data })

    setCollections([...collections, data.result])
    handleModalCleanUp()
  }

  return {
    modalOpen,
    setModalOpen,
    modalView,
    setModalView,
    collections,
    handleCreateCollection
  }
}
