import React from 'react'
import {Link} from 'react-router-dom'

function GetDogItem({getDog}) {
  return (
    <div className='dog_card'>
        <img src="https://media-exp1.licdn.com/dms/image/C4D0BAQH3BE0UnK2ndw/company-logo_200_200/0/1644402020387?e=2147483647&v=beta&t=Lr7FLr_PsSSRXsf4B8Hwb2BOQN0dr4m9fG181L8gaek" alt=""/>
        <div className='product_box'>
            <h2 title={getDog.dog_name}>{getDog.dog_name}</h2>
            <span>${getDog.dog_id}</span>
            <p>${getDog.dog_dob}</p>
        </div>
        <div className='row_btn'>
            <Link id="btn_buy" to="#!">
                Buy
            </Link>
            <Link id="btn_view" to={`detail/${getDog._id}`}>
                View
            </Link>
        </div>
    </div>
  )
}

export default GetDogItem
