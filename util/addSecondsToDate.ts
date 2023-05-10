const addSecondsToDate = (date: string, seconds: number) => {
	const newDateTime = new Date(date).getTime() - seconds
	const newDate = new Date(newDateTime).toISOString()
	return newDate
}

export default addSecondsToDate
