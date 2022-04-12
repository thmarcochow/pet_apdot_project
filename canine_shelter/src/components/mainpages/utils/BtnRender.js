import React from 'react'
import {Link} from 'react-router-dom'

function BtnRender({dog}) {
    return (
        <div className='row_btn'>
            <Link id="btn_buy" to="#!">
                Buy
            </Link>
            <Link id="btn_view" to={"/detailDog/${dog.dog_id}"}>
                Buy
            </Link>
        </div>
    )
}
export default BtnRender