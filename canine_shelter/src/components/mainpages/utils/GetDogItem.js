import React from 'react'
import BtnRender from './BtnRender'

function GetDogItem({getDog, isAdmin}) {
    //console.log(isAdmin)
    return (
        <div className='dog_card'>
            {
            isAdmin && <input type="checkbox" checked={false}/>
            }
            <img src="https://media-exp1.licdn.com/dms/image/C4D0BAQH3BE0UnK2ndw/company-logo_200_200/0/1644402020387?e=2147483647&v=beta&t=Lr7FLr_PsSSRXsf4B8Hwb2BOQN0dr4m9fG181L8gaek" alt=""/>
            <div className='product_box'>
            <h2 title={getDog.dog_name}>{getDog.dog_name}</h2>
            <span>${getDog.dog_id}</span>
            <p>${getDog.dog_dob}</p>
            </div>
            <BtnRender getDog={getDog}/>
        </div>
    )
}

export default GetDogItem
