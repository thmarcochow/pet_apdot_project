import React,{ useContext } from "react"
import {GlobalState} from '../../../GlobalState'
import GetDogItem from '../utils/GetDogItem'
import Loading from '../utils/loading/Loading'

function Dogs() {
  const state = useContext(GlobalState)
  const [getDogList] = state.dogsAPI.dogs
  //console.log(getDogList)

  return (
    <>
    <div className="getDogList">
      {
        getDogList.map(getDog => {
          return <GetDogItem key={getDog._id} getDog={getDog}/>
        })
      }
    </div>
    {getDogList.length === 0 && <Loading />}
    </>
  )
}

export default Dogs
