'use client'

import { FC, ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode
}

const CreationLayout: FC<LayoutProps> = ({ children }) => {
	return <div className='creation-layout-wrapper'>{children}</div>
}

export default CreationLayout
