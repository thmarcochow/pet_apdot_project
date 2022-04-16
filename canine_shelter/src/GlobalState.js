import React, {createContext, useEffect, useState} from 'react'
//import { useRoutes } from 'react-router-dom'
import DogsAPI from './api/DogsAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    
    const refreshToken = async () => {
        const token = await axios.get('/user/refresh_token')

        setToken(token.data.accesstoken)
        //console.log(token)
    }
    
    useEffect(()=> {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])
    
    const state = {
        token: [token, setToken], 
        dogsAPI: DogsAPI(),
        userAPI: UserAPI(token)
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}