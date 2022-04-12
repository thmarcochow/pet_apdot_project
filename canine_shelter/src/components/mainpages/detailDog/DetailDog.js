import React, {useContext, useState, useEffect}from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function DetailDog() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [dogs] = state.dogsAPI.dogs
    const [detailDog, setDetailDog] = useState([])

    useEffect(()=> {
      if(params){
        dogs.forEach(dog => {
          if(dog._id === params.id) setDetailDog(dog)
        })
      }
    })
    //console.log(params)
    console.log("re render")
    if(detailDog.length ===0 )return null;
  return (
    <>
      <div className='detail'>
        <img src="https://media-exp1.licdn.com/dms/image/C4D0BAQH3BE0UnK2ndw/company-logo_200_200/0/1644402020387?e=2147483647&v=beta&t=Lr7FLr_PsSSRXsf4B8Hwb2BOQN0dr4m9fG181L8gaek" alt=""/>
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailDog.dog_name}</h2>
            <h6>#id: {detailDog.dog_id}</h6>
          </div>
          <span>${detailDog.dog_desc}</span>
          <p>{detailDog.dog_desc}</p>
          <p>{detailDog.dog_desc}</p>
          <p>Sold: {detailDog.dog_status}</p>
          <Link to="/cart" className='cart'>Buy Now</Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className='dogs'>
          {/* {
            dogs.map(dog=>{
?              return dog.category === detailDog.category 
                 <GetDogItem key={product._id} dog={dog} /> : null
            })
          } */}
        </div>
      </div>
    </>
    
  )
}

export default DetailDog
