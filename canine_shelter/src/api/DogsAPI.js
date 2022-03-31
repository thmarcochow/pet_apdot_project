import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DogsAPI() {
    const [dogs, setDogs] = useState([])

    const getDogs = async() => {
        const res = await axios.get('/api/dogs')
        //console.log(res.data.dogs)
        setDogs(res.data.dogs)
    }

    useEffect(() => {
        getDogs()
    }, [])
    return {
        dogs:[dogs, setDogs]
    }
}

export default DogsAPI
