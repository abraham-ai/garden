const abbreviateText = (text: string, textLength: number) => {
	if (text.length > textLength) {
		return text.slice(0, textLength - 3) + '...'
	}
	return text
}

export default abbreviateText
