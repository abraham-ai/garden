type TimeFormat = [number, string, number | string]

export default function timeAgo(time: number | string): string {
	let date: number

	switch (typeof time) {
		case 'number':
			date = time
			break
		case 'string':
			date = new Date(time).valueOf()
			break
		default:
			date = new Date().valueOf()
	}

	const timeFormats: TimeFormat[] = [
		[60, 's', 1],
		[120, '1 minute ago', '1 minute from now'],
		[3600, 'm', 60],
		[7200, '1 hour ago', '1 hour from now'],
		[172800, 'h', 3600],
		[604800, 'd', 86400],
		[1209600, 'Last week', 'Next week'],
		[2419200, 'weeks', 604800],
		[4838400, 'Last month', 'Next month'],
		[29030400, 'months', 2419200],
		[58060800, 'Last year', 'Next year'],
		[2903040000, 'years', 29030400],
		[5806080000, 'Last century', 'Next century'],
		[58060800000, 'centuries', 2903040000],
	]

	let seconds = (new Date().valueOf() - date) / 1000
	let token = '' // ago
	let listChoice = 1

	if (seconds === 0) {
		return 'Just now'
	}
	if (seconds < 0) {
		seconds = Math.abs(seconds)
		token = 'from now'
		listChoice = 2
	}

	for (const format of timeFormats) {
		if (seconds < format[0]) {
			if (typeof format[2] === 'string') {
				return format[listChoice] as string
			} else {
				return String(Math.floor(seconds / format[2])) + format[1] + ' ' + token
			}
		}
	}

	return new Date(date).toString()
}
