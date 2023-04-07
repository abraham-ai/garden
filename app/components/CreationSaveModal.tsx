import React, { useState, useEffect, useContext, useMemo } from 'react'
import type Collection from '../../../interfaces/Collection'
import type { FC } from 'react'
import type Creation from '../../../interfaces/Creation'

import Link from 'next/link'

import AppContext from '../../context/AppContext'

import axios from 'axios'

import useGetCollections from '../../hooks/useGetCollections'

import { Modal, Button, Input, notification, Typography, Row, Col } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { BiLeftArrowAlt } from 'react-icons/bi'
import { MdOutlineAdd } from 'react-icons/md'

import styles from '../../styles/CreationSaveModal.module.css'

const { Text } = Typography

interface CreationSaveModalTypes {
  creation: Creation
}

const CreationSaveModal: FC<CreationSaveModalTypes> = ({ creation }) => {
	const [inputCollectionName, setInputCollectionName] = useState('')

  const [isRenameCollection, setIsRenameCollection] = useState(false)
  const [currentRenameCollection, setCurrentRenameCollection] = useState('')
	const [currentSavedCollection, setCurrentSavedCollection] = useState<Collection>({})

  const [api, contextHolder] = notification.useNotification()

  const context = useContext(AppContext)
  const collections = context?.collections || []
  const selectedCollection = context?.selectedCollection || ''
  const setSelectedCollection = context?.setSelectedCollection || (() => {})
  const setCollections = useMemo(() => context?.setCollections || (() => []), [context])

  const collectionModalView = context?.collectionModalView
  const setCollectionModalView = (value: number): void => {
    context?.setCollectionModalView(value)
  }

	const isSaveCreationModalOpen = context?.isSaveCreationModalOpen || false
	const setIsSaveCreationModalOpen = context?.setIsSaveCreationModalOpen || (() => {})

  // const inputCollectionRef = useRef<InputRef>(null)

  const collectionsData = useGetCollections()

  // console.log(collections)
  // console.log(collectionsData)
  // console.log(collectionModalView)


  const createNotification = (placement: NotificationPlacement): JSX.Element => {
    api.info({
      message: `Collection ${String(inputCollectionName)} created!`,
      description:
        'View your collection in the Collections tab or on your profile page.',
      placement
    })
  }

	const saveNotification = (placement: NotificationPlacement): JSX.Element => {
    console.log('save Notification')
		console.log(currentSavedCollection)
		const savedCollectionPropsArray = Object.keys(currentSavedCollection)
		
		if (typeof currentSavedCollection !== 'undefined' && savedCollectionPropsArray.length > 0) {
			setIsSaveCreationModalOpen(false)
			api.info({
				message: <>
					<Text>{`Creation saved to`}
						<Link 
							href={`/collection/${String(currentSavedCollection._id)}`}
							style={{ margin: '0 5px' }}
						>
							{String(currentSavedCollection.name)}
						</Link>
					{`Collection!`}</Text>
					</>,
				description:
					'View your collection in the Collections tab or on your profile page.',
				placement,
				duration: 3
			})
		}
		
  }

  useEffect(() => {
    // console.log('USE-EFFECT')
    // console.log({collectionsData})
    if (typeof collectionsData !== 'undefined') {
      // console.log('SET COLLECTIONS!')
      setCollections(collectionsData)
    }
  }, [collectionsData, setCollections])

	useEffect(() => {
		const savedCollectionPropsArray = Object.keys(currentSavedCollection)

		if (typeof currentSavedCollection !== 'undefined' && savedCollectionPropsArray.length > 0) {
			console.log(currentSavedCollection)
			handleSaveModalCleanUp()
		}
	}, [currentSavedCollection])

	const handleFirstModal = (): void => {
		console.log('handleFirstModal')
		setCollectionModalView(1)
	}

	const handleSaveModalCleanUp = (): void => {
    // setModalOpen(false)
    setCollectionModalView(0)
		// console.log({ currentSavedCollection })
    // setInputCollectionName('')


		if (typeof currentSavedCollection !== 'undefined') {
			// console.log(currentSavedCollection)
			saveNotification('bottom')
		}
  }

	const handleCreateModalCleanUp = (): void => {
    setIsCreationModalOpen(false)
    setCollectionModalView(0)
    // setInputCollectionName('')
    createNotification('bottom')
  }

	const handleCreateCollection = async (e, inputCollectionName: string, creationId: string): Promise<void> => {
		const { data } = await axios.post('/api/collection/create', {
			collectionName: inputCollectionName,
			creationId
		})

		setCollections(prevCollections => [...prevCollections, data])
		setSelectedCollection(data.name)
		handleCreateModalCleanUp()
	}

	const handleSaveToCollection = async (collectionId, creationId): Promise<void> => {
		const { data } = await axios.post('/api/collection/save', {
			collectionId,
			creationId
		})

		const { addedCreationResult, collection, creation } = data

		// console.log({ data })

		if (addedCreationResult?.success === true) {
			setCurrentSavedCollection(collection)
			handleSaveModalCleanUp()
		}
	}

	const handleRenameCollectionName = async (inputCollectionName: string, collectionId: string): Promise<void> => {
		// const { data } =
		await axios.post('/api/collection/rename', {
			inputCollectionName,
			collectionId
		})
	}

	// const handleDeleteCollectionName = async (inputCollectionName: string): Promise<void> => {
	// 	// const { data } =
	// 	await axios.post('/api/collection/delete', {
	// 		collectionName: inputCollectionName
	// 	})
	// }

	// const openRenameCollectionView = (collectionName, collectionId): void => {
  //   setCollectionModalView(1)
  //   setIsRenameCollection(true)
  //   setCurrentRenameCollection(collectionName)

  //   if (typeof inputCollectionRef.current !== 'undefined' && inputCollectionRef.current !== null) {
	// 		inputCollectionRef.current!.focus({
	// 				cursor: 'start'
	// 		})
  //   }
	// }

  // console.log({collections})
  // console.log({ collectionsData })

  return (
    <Modal open={isSaveCreationModalOpen} footer={<></>} onCancel={() => setIsSaveCreationModalOpen(false)}>

      <div style={{ padding: 20, borderRadius: 20 }}>
        <section className={styles.modalView1}>

          <Text className={styles.debugModalView}>
            {`Modal View: ${String(collectionModalView)}`}
          </Text>

          { collectionModalView === 0 ?
            <article className={styles.modalView1}>
              { collections.length > 0 ?
                <>
                  <Text className={styles.saveModalCollectionTitle}>{'Your Collections.'}</Text>
                  <Col>
                    {collections.map((collection: Collection, i: number) => {
                      return (
                        <Row key={i} className={styles.row}>
                          <Button
                            shape='round'
														onClick={() => { handleSaveToCollection(collection._id, creation._id) }}
                            className={styles.button}
                          >
                              {collection.name}
                          </Button>
                        </Row>
                      )
                    })}
                  </Col>
                </>
              :
								<Text className={styles.textNotification}>{'You don’t have any collections yet.'}</Text>
            }
              <Button
								shape='round'
								type='primary'
								icon={
									<span style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginRight: 10
										}}
									>
										<MdOutlineAdd style={{ fontSize: '1.3rem' }} />
									</span>
								}
								onClick={() => { handleFirstModal() }}
								className={styles.buttonPrimary}
								style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
							>
                {'Create a new collection'}
              </Button>
            </article>
          :
          null }

          { collectionModalView === 1
            ?
            <article className={styles.modalView2}>
                {isRenameCollection === true
                  ?
                  <>
                      <Row className={styles.row}>
                        <Button type='link'
                          className={styles.buttonLink} onClick={() => { setCollectionModalView(0) }}>
                            <BiLeftArrowAlt size={'1.2rem'} />
                        </Button>
                        <Text className={styles.textBold}>{'Rename Collection:'}</Text>
                      </Row>

                      <Input
                        placeholder={currentRenameCollection}
                        onChange={(e) => {
                          setInputCollectionName(e.target.value)
                        }}
                        />
                      <Button
                        type={'primary'}
                        shape='round'
                        className={styles.buttonPrimary}
                        disabled={inputCollectionName === '' ? true : false}
                        onClick={() => { handleRenameCollectionName(currentRenameCollection, creation._id) }}
                        >
                        {'Rename'}
                      </Button>
                    </>
                  :
                  (
                    <>
                        <Row>
                          <Button
                            type='link'
                            className={styles.buttonLink}
                            onClick={() => { setCollectionModalView(0) }}
                            >
                            <BiLeftArrowAlt size={'1rem'} />
                          </Button>


                          <Text className={styles.textBold}>{'Create Collection'}</Text>
                        </Row>

                        <Input
                          placeholder=''
                          onChange={(e) => {
                            setInputCollectionName(e.target.value)
                          }}
                          />

                        <Button
                          type={'primary'}
                          shape='round'
                          className={styles.buttonPrimary}
                          disabled={inputCollectionName === '' ? true : false}
                          onClick={(e) => { handleCreateCollection(e, inputCollectionName, creation._id) }}
                          >
                          {'Create'}
                        </Button>
                      </>
                    )
                  }
              </article>
            : null }
        </section>
      </div>
			{contextHolder}
	</Modal>
	)
}

export default CreationSaveModal
