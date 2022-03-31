import React, {createContext, useState} from 'react'
import { useRoutes } from 'react-router-dom'
import DogsAPI from './api/DogsAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    
    
    
    DogsAPI()
    const state = {
        token: [token, setToken], 
        dogsAPI: DogsAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}