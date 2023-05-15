import { useState } from 'react'

const useCreationsGridParams = () => {
	const [username, setUsername] = useState<string | string>('')
	const [generators, setGenerators] = useState<string | string>('create')
	const [earliestTime, setEarliestTime] = useState<number | string>('')
	const [latestTime, setLatestTime] = useState<number | string>('')
	const [limit, setLimit] = useState<number>(10)

	return {
		username,
		setUsername,
		generators,
		setGenerators,
		earliestTime,
		setEarliestTime,
		latestTime,
		setLatestTime,
		limit,
		setLimit,
	}
}

export default useCreationsGridParams
