import React, { useState } from 'react'

import Header from '../app/components/NavBar/Header'

import {
  Alert,
	Button,
  Card,
  Form,
  Input,
  Layout,
  Space,
  Tag,
  Typography,
  Col,
  Row,
  Upload,
} from 'antd'

const { TextArea } = Input
const { Title, Text } = Typography
const { Content } = Layout // Header, 

import styles from '../styles/EditProfile.module.css'

import { PlusOutlined } from '@ant-design/icons'

const EditProfile = () => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false)
  const [isUsernameAvailable] = useState<boolean>(false) // setIsUsernameAvailable

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled)
  }

  const log = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    return e ? e : null
  }

  return (
		<>
			<Header/>

      {/* <Header className="profile-header">
      </Header> */}

      <Content className={styles.contentWrapper}>
				<Row style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
					<Title>{'Edit Profile'}</Title>
				</Row>
        <Card className={styles.editProfileFormWrapper}>
          <Form
            className={styles.profileForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
            disabled={componentDisabled}
          >
            <Row className={styles.formRow}>
              <Space className={styles.formHeader}>
                <Text className={styles.formTitle}>Enter your details</Text>
              </Space>
              <Col className={styles.formInfo} span={12}>
                <Form.Item
                  className={styles.formItem}
                  label={
                    <Space className={styles.formLabelWrapper}>
                      <Text className={styles.formLabel}>Name</Text>
                      <Text className="formLabelOptional" type="secondary">
                        Optional
                      </Text>
                    </Space>
                  }
                  labelCol={{ span: 24 }}
                  colon={false}
                >
                  <Input className="formInput" size="large" />
                </Form.Item>

                <Form.Item
                  className="formItem"
                  style={{ marginBottom: 15 }}
                  label={
                    <Space className="formLabelWrapper">
                      <Text className="formLabel">Username</Text>
                      <Text className="formLabelOptional" type="secondary">
                        Optional
                      </Text>
                    </Space>
                  }
                  labelCol={{ span: 24 }}
                  colon={false}
                >
                  <Input
                    className="formInput"
                    style={{ margin: 0 }}
                    prefix={'@'}
                    size="large"
                  />
                </Form.Item>
                {isUsernameAvailable ? (
                  <Alert
                    message={`Username ${'test'} is available`}
                    type="success"
                    style={{ height: 30 }}
                  />
                ) : (
                  <Alert
                    message={`Username ${'test'} is unavailable`}
                    type="error"
                    style={{ height: 30, color: 'red' }}
                  />
                )}
              </Col>
            </Row>

            <Row className="formRow">
              <Col className="formInfo" span={12}>
                <Space className="formHeader">
                  <Text className="formTitle">
                    Receive email notifications
                  </Text>
                  <Text className="formDescription">
                    Add your email address to receive notifications about your
                    activity on Eden. This will not be shown on your profile.
                  </Text>
                </Space>
              </Col>
              <Col className="formInfo" span={12}>
                <Form.Item
                  className="formItem"
                  label={
                    <Space className="formLabelWrapper">
                      <Text className="formLabel">Email</Text>
                    </Space>
                  }
                  labelCol={{ span: 24 }}
                  colon={false}
                >
                  <Input className="formInput" prefix={'@'} size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row className="formRow">
              <Space className="formHeader">
                <Text className="formTitle">Add a short bio</Text>
              </Space>
              <Col className="formInfo" span={12}>
                <Form.Item
                  className="formItem textArea"
                  label={
                    <Space className="formLabelWrapper textArea">
                      <Text className="formLabel">Enter a short bio</Text>
                      <Text className="formLabelOptional" type="secondary">
                        Optional
                      </Text>
                    </Space>
                  }
                  labelCol={{ span: 24 }}
                  colon={false}
                >
                  <TextArea
                    className="formInput"
                    style={{ height: 274 }}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="formRow">
              <Col className="formInfo" span={12}>
                <Space className="formHeader">
                  <Text className="formTitle">Upload a profile image</Text>
                  <Text className="formDescription">
                    {'Recommended size: 1000x1000px'}
                  </Text>
                  <Text className="formDescription">
                    {'JPG, PNG, or GIF.'}
                  </Text>
                  <Text className="formDescription">{'10MB max size'}</Text>
                </Space>
              </Col>
              <Col
                className="formInputWrapper upload"
                span={12}
                style={{ flexFlow: 'column' }}
              >
                <Form.Item
                  className="formItem upload"
                  colon={false}
                  label={
                    <Space className="formLabelWrapper">
                      <Text className="formLabel">Upload</Text>
                      <Text className="formLabelOptional" type="secondary">
                        Optional
                      </Text>
                    </Space>
                  }
                  valuePropName="fileList"
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    style={{ background: 'red' }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row className="formRow">
              <Col className="formInfo" span={12}>
                <Space className="formHeader">
                  <Text className="formTitle">Upload a cover image</Text>
                  <Text className="formDescription">
                    {'Recommended size: 1500x1500px'}
                  </Text>
                  <Text className="formDescription">
                    {'JPG, PNG, or GIF.'}
                  </Text>
                  <Text className="formDescription">{'10MB max size'}</Text>
                </Space>
              </Col>
              <Col
                className="formInputWrapper upload"
                span={12}
                style={{ flexFlow: 'column' }}
              >
                <Form.Item
                  className="formItem upload"
                  colon={false}
                  label={
                    <Space className="formLabelWrapper">
                      <Text className="formLabel">Upload</Text>
                      <Text className="formLabelOptional" type="secondary">
                        Optional
                      </Text>
                    </Space>
                  }
                  valuePropName="fileList"
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    style={{ background: 'red' }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row className="formRow">
              <Col className="formInfo" span={12}>
                <Space className="formHeader">
                  <Text className="formTitle">Verify your profile</Text>
                  <Text>
                    Show the Eden community that your profile is authentic.
                  </Text>
                </Space>
              </Col>
              <Col span={12}>
                <Tag className="formTag" closable onClose={log}>
                  @custom_username Twitter
                </Tag>
                <Tag className="formTag" closable onClose={log}>
                  @custom_username Instagram
                </Tag>
              </Col>
            </Row>

            <Row className="form-row" style={{ flexDirection: 'column' }}>
              <Col
                className="form-info"
                span={24}
                style={{ flex: 0, minHeight: 'unset', paddingBottom: 15 }}
              >
                <Space className="formHeader">
                  <Text className="formTitle">Add links to</Text>
                  <Text className="formTitle">your social media profiles</Text>
                </Space>
              </Col>
              <Col span={24} style={{ flex: 1 }}>
                <Input
                  className="formInput"
                  prefix={<>{'Website'}</>}
                  size="large"
                />
                <Input
                  className="formInput"
                  prefix={<>{'Discord'}</>}
                  size="large"
                />
                <Input
                  className="formInput"
                  prefix={<>{'YouTube'}</>}
                  size="large"
                />
                <Input
                  className="formInput"
                  prefix={<>{'Facebook'}</>}
                  size="large"
                />
                <Input
                  className="formInput"
                  prefix={<>{'Twitch'}</>}
                  size="large"
                />
                <Input
                  className="formInput"
                  prefix={<>{'TikTok'}</>}
                  size="large"
                />
                <Input
                  className="formInput"
                  prefix={<>{'Snapchat'}</>}
                  size="large"
                />
              </Col>
            </Row>

            <Form.Item className="formSubmit">
              <Button style={{ width: '100%' }}>Save changes</Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
		</>
  )
}

export default EditProfile
