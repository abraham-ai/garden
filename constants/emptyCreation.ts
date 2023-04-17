import type Task from '../interfaces/Task'
import type Config from '../interfaces/Config'

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

export default emptyCreation
