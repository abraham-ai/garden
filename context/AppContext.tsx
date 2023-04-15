import { createContext } from 'react'
import type AppContextTypes from '../interfaces/AppContext'

const AppContext = createContext<AppContextTypes | null>(null)

export default AppContext
