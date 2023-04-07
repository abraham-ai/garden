const abbreviateAddress = (user: string) => {
	let displayAddress = user?.substring(0, 6)
	return (displayAddress += '...' + user.slice(-4))
}

export default abbreviateAddress
