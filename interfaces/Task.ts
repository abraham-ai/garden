import type Config from '../interfaces/Config'
import type Generator from '../interfaces/Generator'

interface Task {
	_id: string
	taskId: string
	config: Config
	generator: Generator
	status: string
	key: number
	address: string
	uri: string
	timestamp: string
	prompt: string
	progress: number
}

export default Task
