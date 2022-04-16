import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function BtnRender({dog}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <div className='row_btn'>
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" >
                        Delete
                    </Link>
                    <Link id="btn_view" to={"/edit_product/${dog.dog_id}"}>
                        Edit
                    </Link>
                </>
                : 
                <>
                    <Link id="btn_buy" to="#!" >
                        Buy
                    </Link>
                    <Link id="btn_view" to={"/detail/${dog.dog_id}"}>
                        View
                    </Link>
                </>
            }
        </div>
    )
}
export default BtnRender