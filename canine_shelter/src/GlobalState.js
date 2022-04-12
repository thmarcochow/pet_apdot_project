import axios from 'axios'
import React, {createContext, useEffect, useState} from 'react'
import { useRoutes } from 'react-router-dom'
import DogsAPI from './api/DogsAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    
    const refreshToken = async () => {
        const token = await axios.get('/user/refresh_token')
        
        console.log(token)
    }
    
    useEffect(()=> {
        refreshToken()
    },[])
    
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