import Task from '../interfaces/Task'
import Config from '../interfaces/Config'

interface CreationResponse {
	creation: {
		_id: string
		key: string
		task: Task
		config: Config
		user: string
		createdAt: string
		address: string
		uri: string
		timestamp: string
		prompt: string
		status: string
		thumbnail: string
	}
}

export default CreationResponse
