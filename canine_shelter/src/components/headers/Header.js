import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Shelter from './icon/shelter.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header(){
    const value = useContext(GlobalState)
    const [isLogged, setIsLogged] = value.userAPI.isLogged
    const [isAdmin, setIsAdmin] = value.userAPI.isAdmin
    //console.log(value)
    
    const logoutUser = async () =>{
        await axios.get('/user/logout')
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
        //localStorage.removeItem('firstLogin')
        //window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
            </>
        )
    }
    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                
            </>
        )
    }
    // onClick={logoutUser}
    return(
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'DevAT Shop'}</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login/Register</Link></li>
                }

                <li><img src={Close} alt="" width="30" className='menu'/></li>
                    
            </ul>


            {
                isAdmin ? '' 
                :<div className="shelter-icon">
                    <span>0</span>
                    <Link to="/shelter">
                        <img src={Shelter} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header