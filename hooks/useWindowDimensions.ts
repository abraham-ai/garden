import { useState, useEffect } from 'react'

interface WindowDimensions {
	width: number
	height: number
}

function getWindowDimensions(): WindowDimensions {
	if (typeof window !== 'undefined') {
		// detect window screen width function
		const { innerWidth: width, innerHeight: height } = window
		return {
			width,
			height,
		}
	} else {
		return {
			width: 0,
			height: 0,
		}
	}
}

export default function useWindowDimensions(): WindowDimensions {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
		getWindowDimensions()
	)

	useEffect(() => {
		function handleResize(): void {
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	if (typeof windowDimensions !== 'undefined') {
		return windowDimensions
	} else {
		return {
			width: 0,
			height: 0,
		}
	}
}
