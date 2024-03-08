import navbar from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import burger from '../images/burger_32.png'

function Navbar(props) {
    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];

    const dateCreated = props.dateCreated[0];
    const setDateCreated = props.dateCreated[1];
    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(false);
    var container = document.querySelector(`#${container}`)

    function handleLogOut(){
        // localStorage.setItem('loginVal', JSON.stringify(0));
        localStorage.removeItem("loginVal")
        setLoginVal(0)
        localStorage.removeItem('dateCreated')
        // localStorage.setItem('dateCreated', JSON.stringify(new Date().getFullYear().slice(0,10)));
        setDateCreated(new Date().getFullYear().slice(0,10))
        navigate('/home')
    }

    const handleBurgerClick = ()=>{
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className={!isNavOpen?navbar.container:navbar.containerExpanded} id={navbar.container}>
            <div style={{cursor:'pointer'}} onClick={()=>{navigate('/')}} className={!isNavOpen?navbar.title:navbar.titleExpanded}>
                Thoughts
            </div>
            <div className={!isNavOpen?navbar.centerLinks:navbar.centerLinksExpanded}>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to={!loginVal?'/login':'/create'}>Create</Link>
                        </li>
                        <li>
                            <Link to={!loginVal?'/login':'/history'}>History</Link>
                        </li>
                    </ul>
                
            </div>
            <div className={!isNavOpen?navbar.endLinks:navbar.endLinksExpanded}>
                {!loginVal?(
                    <ul>
                        <li>
                            <Link to='/login'>Log-in</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Sign-up</Link>
                        </li>
                    </ul>
                ):(
                    <ul>
                        <li>
                            <Link to='/home' onClick={handleLogOut}>Log-Out</Link>
                        </li>
                       
                    </ul>
                )
                }
            </div>
            <div className={!isNavOpen?navbar.burgerMenu:navbar.burgerMenuExpanded}>
                <img src={burger} id={navbar.burger} width={24} onClick={handleBurgerClick}></img>

            </div>
        </div>
    )
}



export default Navbar;