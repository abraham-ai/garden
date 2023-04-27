import React, { useState, useEffect, useContext } from 'react'
import type { FC, MouseEvent, ChangeEvent } from 'react'
import AppContext from '../context/AppContext'

import Header from '../app/components/NavBar/Header'
import CreatorHeader from '../app/components/Creator/CreatorHeader'

import styles from '../styles/EditProfile.module.css'

import {
	Button,
	Card,
	Form,
	Input,
	Layout,
	Space,
	Typography,
	Col,
	Row,
	notification,
} from 'antd'

const { Title, Text } = Typography
const { Content } = Layout
const { useForm } = Form

interface FormValues {
	newUsername: string
	newDiscordId: string
}

const openNotificationWithIcon = (
	type: 'success' | 'error',
	message: string,
	description: string
): void => {
	notification[type]({
		message,
		description,
		placement: 'bottom',
	})
}

const EditProfile: FC = () => {
	const context = useContext(AppContext)

	const [form] = useForm()
	const [formSubmitting, setFormSubmitting] = useState(false)
	const [componentDisabled, setComponentDisabled] = useState<boolean>(false)
	const [formValues, setFormValues] = useState<FormValues>({
		newUsername: '',
		newDiscordId: '',
	})

	const userId = context?.userId ?? ''

	const onFormLayoutChange = ({ disabled }: { disabled: boolean }): void => {
		setComponentDisabled(disabled)
	}

	const handleFormSubmit = async (): Promise<void> => {
		try {
			setComponentDisabled(true)
			const values = await form.validateFields()

			console.log(values)

			const { newUsername, newDiscordId } = formValues

			const response = await fetch('/api/profile/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ newUsername, newDiscordId }),
			})
			const data = await response.json()

			console.log(data)

			openNotificationWithIcon(
				'success',
				'Profile updated successfully!',
				'Your profile has been updated.'
			)
		} catch (error) {
			openNotificationWithIcon('error', 'Error updating profile', error.message)
		} finally {
			setComponentDisabled(false)
		}
	}

	useEffect(() => {
		if (formSubmitting) {
			handleFormSubmit()
				.then(() => {
					setFormSubmitting(false)
				})
				.catch((error) => {
					notification.error({
						message: 'Error updating profile',
						description: error.message,
						placement: 'bottom',
					})
					setFormSubmitting(false)
				})
		}
	}, [formSubmitting])

	useEffect(() => {
		console.log(handleSaveChangesType())
	}, [formValues])

	const handleSaveChangesType = (): 'primary' | 'default' => {
		if (formValues.newUsername !== '' || formValues.newDiscordId !== '') {
			return 'primary'
		} else {
			return 'default'
		}
	}

	console.log(handleSaveChangesType())

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: keyof FormValues
	): void => {
		setFormValues({ ...formValues, [field]: e.target.value })
	}

	console.log(formValues.newUsername)
	console.log(formValues.newDiscordId)

	return (
		<>
			<Header />

			<Content className={styles.contentWrapper}>
				<CreatorHeader userId={userId} />
				<Row
					style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
				>
					<Title>{'Edit Profile'}</Title>
				</Row>
				<Card className={styles.editProfileFormWrapper}>
					<Form
						className={styles.profileForm}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 14 }}
						layout='horizontal'
						onValuesChange={onFormLayoutChange}
						disabled={componentDisabled}
					>
						<Row className={styles.formRow}>
							<Space className={styles.formHeader}>
								<Text className={styles.formTitle}>{'Enter your details'}</Text>
							</Space>
							<Col className={styles.formInfo} span={12}>
								<Form.Item
									className={styles.formItem}
									label={
										<Space className={styles.formLabelWrapper}>
											<Text className={styles.formLabel}>{'Username'}</Text>
											<Text
												className={styles.formLabelOptional}
												type='secondary'
											>
												{'Optional'}
											</Text>
										</Space>
									}
									labelCol={{ span: 24 }}
									colon={false}
								>
									<Input
										className={styles.formInput}
										size='large'
										onChange={(e) => {
											handleInputChange(e, 'newUsername')
										}}
									/>
								</Form.Item>

								<Form.Item
									className='formItem'
									style={{ marginBottom: 15 }}
									label={
										<Space className={styles.formLabelWrapper}>
											<Text className={styles.formLabel}>{'Discord Id'}</Text>
											<Text
												className={styles.formLabelOptional}
												type='secondary'
											>
												{'Optional'}
											</Text>
										</Space>
									}
									labelCol={{ span: 24 }}
									colon={false}
								>
									<Input
										className={styles.formInput}
										style={{ margin: 0 }}
										prefix={'@'}
										size='large'
										onChange={(e) => {
											handleInputChange(e, 'newDiscordId')
										}}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Form.Item
							className={styles.formSubmit}
							style={{ display: 'flex', justifyContent: 'center' }}
						>
							<Button
								type={handleSaveChangesType()}
								onClick={() => {
									setFormSubmitting(true)
								}}
								shape='round'
								size='large'
							>
								{'Save changes'}
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Content>
		</>
	)
}

export default EditProfile

// {/* {isUsernameAvailable ? (
// 	<Alert
// 		message={`Username ${'test'} is available`}
// 		type='success'
// 		style={{ height: 30 }}
// 	/>
// ) : (
// 	<Alert
// 		message={`Username ${'test'} is unavailable`}
// 		type='error'
// 		style={{ height: 30, color: 'red' }}
// 	/>
// )} */}

// {
/* <Row className={styles.formRow}>
<Col className={styles.formInfo} span={12}>
	<Space className={styles.formHeader}>
		<Text className={styles.formTitle}>
			{'Receive email notifications'}
		</Text>
		<Text className={styles.formDescription}>
			{
				'Add your email address to receive notifications about your'
			}
			{
				'activity on Eden. This will not be shown on your profile.'
			}
		</Text>
	</Space>
</Col>
<Col className={styles.formInfo} span={12}>
	<Form.Item
		className={styles.formItem}
		label={
			<Space className={styles.formLabelWrapper}>
				<Text className={styles.formLabel}>{'Email'}</Text>
			</Space>
		}
		labelCol={{ span: 24 }}
		colon={false}
	>
		<Input
			className={styles.formInput}
			prefix={'@'}
			size='large'
		/>
	</Form.Item>
</Col>
</Row>

<Row className={styles.formRow}>
<Space className={styles.formHeader}>
	<Text className={styles.formTitle}>{'Add a short bio'}</Text>
</Space>
<Col className={styles.formInfo} span={12}>
	<Form.Item
		className={(styles.formItem, styles.textArea)}
		label={
			<Space
				className={(styles.formLabelWrapper, styles.textArea)}
			>
				<Text className={styles.formLabel}>
					{'Enter a short bio'}
				</Text>
				<Text
					className={styles.formLabelOptional}
					type='secondary'
				>
					{'Optional'}
				</Text>
			</Space>
		}
		labelCol={{ span: 24 }}
		colon={false}
	>
		<TextArea
			className={styles.formInput}
			style={{ height: 274 }}
			size='large'
		/>
	</Form.Item>
</Col>
</Row>

<Row className={styles.formRow}>
<Col className={styles.formInfo} span={12}>
	<Space className={styles.formHeader}>
		<Text className={styles.formTitle}>
			{'Upload a profile image'}
		</Text>
		<Text className={styles.formDescription}>
			{'Recommended size: 1000x1000px'}
		</Text>
		<Text className={styles.formDescription}>
			{'JPG, PNG, or GIF.'}
		</Text>
		<Text className={styles.formDescription}>
			{'10MB max size'}
		</Text>
	</Space>
</Col>
<Col
	className={(styles.formInputWrapper, styles.upload)}
	span={12}
	style={{ flexDirection: 'column' }}
>
	<Form.Item
		className={(styles.formItem, styles.upload)}
		colon={false}
		label={
			<Space className={styles.formLabelWrapper}>
				<Text className={styles.formLabel}>{'Upload'}</Text>
				<Text
					className={styles.formLabelOptional}
					type='secondary'
				>
					{'Optional'}
				</Text>
			</Space>
		}
		valuePropName='fileList'
	>
		<Upload
			action='/upload.do'
			listType='picture-card'
			style={{ background: 'red' }}
		>
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>{'Upload'}</div>
			</div>
		</Upload>
	</Form.Item>
</Col>
</Row>

<Row className={styles.formRow}>
<Col className={styles.formInfo} span={12}>
	<Space className={styles.formHeader}>
		<Text className={styles.formTitle}>
			{'Upload a cover image'}
		</Text>
		<Text className={styles.formDescription}>
			{'Recommended size: 1500x1500px'}
		</Text>
		<Text className={styles.formDescription}>
			{'JPG, PNG, or GIF.'}
		</Text>
		<Text className={styles.formDescription}>
			{'10MB max size'}
		</Text>
	</Space>
</Col>
<Col
	className={(styles.formInputWrapper, styles.upload)}
	span={12}
	style={{ flexFlow: 'column' }}
>
	<Form.Item
		className={(styles.formItem, styles.upload)}
		colon={false}
		label={
			<Space className={styles.formLabelWrapper}>
				<Text className={styles.formLabel}>{'Upload'}</Text>
				<Text
					className={styles.formLabelOptional}
					type='secondary'
				>
					{'Optional'}
				</Text>
			</Space>
		}
		valuePropName='fileList'
	>
		<Upload
			action='/upload.do'
			listType='picture-card'
			style={{ background: 'red' }}
		>
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>{'Upload'}</div>
			</div>
		</Upload>
	</Form.Item>
</Col>
</Row>

<Row className={styles.formRow}>
<Col className={styles.formInfo} span={12}>
	<Space className={styles.formHeader}>
		<Text className={styles.formTitle}>
			{'Verify your profile'}
		</Text>
		<Text>
			{'Show the Eden community that your profile is authentic.'}
		</Text>
	</Space>
</Col>
<Col span={12}>
	<Tag className={styles.formTag} closable onClose={log}>
		{'@custom_username Twitter'}
	</Tag>
	<Tag className={styles.formTag} closable onClose={log}>
		{'@custom_username Instagram'}
	</Tag>
</Col>
</Row>

<Row className={styles.formRow} style={{ flexDirection: 'column' }}>
<Col
	className={styles.formInfo}
	span={24}
	style={{ flex: 0, minHeight: 'unset', paddingBottom: 15 }}
>
	<Space className={styles.formHeader}>
		<Text className={styles.formTitle}>{'Add links to'}</Text>
		<Text className={styles.formTitle}>
			{'your social media profiles'}
		</Text>
	</Space>
</Col>
<Col span={24} style={{ flex: 1 }}>
	<Input
		className={styles.formInput}
		prefix={<>{'Website'}</>}
		size='large'
	/>
	<Input
		className={styles.formInput}
		prefix={<>{'Discord'}</>}
		size='large'
	/>
	<Input
		className={styles.formInput}
		prefix={<>{'YouTube'}</>}
		size='large'
	/>
	<Input
		className={styles.formInput}
		prefix={<>{'Facebook'}</>}
		size='large'
	/>
	<Input
		className={styles.formInput}
		prefix={<>{'Twitch'}</>}
		size='large'
	/>
	<Input
		className={styles.formInput}
		prefix={<>{'TikTok'}</>}
		size='large'
	/>
	<Input
		className={styles.formInput}
		prefix={<>{'Snapchat'}</>}
		size='large'
	/>
</Col>
</Row> */
// }
