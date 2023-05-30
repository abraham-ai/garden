import type { FC } from 'react'
import React from 'react'
import { Slider } from 'antd'

const formatter = (value: number): string => `${value}`

const ColumnSlider: FC = () => (
	<>
		<Slider min={1} max={10} tooltip={{ formatter }} />
	</>
)

export default ColumnSlider
