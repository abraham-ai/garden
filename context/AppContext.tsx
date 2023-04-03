import { createContext } from 'react'
import AppContextTypes from '../interfaces/AppContext'

const AppContext = createContext<AppContextTypes | null>(null)

export default AppContext
