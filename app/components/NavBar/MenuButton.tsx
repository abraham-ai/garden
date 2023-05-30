import type { FC } from 'react'
import React, { useContext, useMemo, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AppContext from '../../../context/AppContext'
import { Button, ConfigProvider, theme } from 'antd'

import { HiOutlineUsers, HiHome } from 'react-icons/hi'
import { BsGrid3X3 } from 'react-icons/bs'
import { IoMdGitNetwork } from 'react-icons/io'

const themeDark = { algorithm: theme.darkAlgorithm }
const themeDefault = { algorithm: theme.defaultAlgorithm }

// Define the type for the title
type Title = 'creator' | 'creations' | 'collections' | 'concepts'

// Define the type for the MenuButtonProps
interface MenuButtonProps {
	title: Title
	pathname: string
}

const MenuButton: FC<MenuButtonProps> = ({ title, pathname }) => {
	const context = useContext(AppContext)
	const router = useRouter()

	const appTheme = context?.appTheme ?? 'light'
	const isLight = appTheme === 'light'
	const currentTheme = isLight ? themeDefault : themeDark

	const isCreator = title === 'creator'
	const isCreations = title === 'creations'
	const isCollections = title === 'collections'
	const isConcepts = title === 'concepts'

	const menuIcon = useMemo(() => {
		switch (title) {
			case 'creations':
				return <HiHome />
			case 'collections':
				return <BsGrid3X3 />
			case 'concepts':
				return <IoMdGitNetwork />
			case 'creators':
				return <HiOutlineUsers />
			default:
				return <></> // Empty
		}
	}, [title])

	const lowerTitle = title.toLowerCase()
	const isSelected = lowerTitle === pathname

	// console.log(path.includes(lowerTitle))
	// const isSelected = path.includes(lowerTitle) // Comparing to the saved page
	console.log({ lowerTitle })
	console.log({ pathname })
	console.log({ isSelected })

	return (
		<ConfigProvider theme={currentTheme}>
			<Button type={isSelected ? 'primary' : 'text'} icon={menuIcon}>
				{title}
			</Button>
		</ConfigProvider>
	)
}

export default MenuButton
