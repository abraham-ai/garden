const themeOnLoad = (): string => {
	const now = new Date()
	const hours = now.getHours()

	// console.log(hours)
	// console.log(hours >= 8 && hours <= 20)

	if (hours >= 6 && hours <= 20) {
		return 'light'
	} else if (hours >= 20 || hours <= 6) {
		return 'dark'
	} else {
		return 'light'
	}
}

export default themeOnLoad
