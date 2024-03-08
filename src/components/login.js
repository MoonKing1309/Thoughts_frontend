import login from './form.module.css'
import { useEffect, useState } from 'react';
import Home from '../components/home';
import {Link,useNavigate} from 'react-router-dom'
import eyeShow from '../images/eyeShow16.png'
import eyeHide from '../images/eyeHide16.png'
import axios from 'axios';

export default function Login(props){
    
    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];
    const dateCreated = props.dateCreated[0];
    const setDateCreated = props.dateCreated[1];

    const navigate = useNavigate()
    async function handleSubmit(event)
    {
        event.preventDefault();
        var userName = document.querySelector("input[name='uname']").value
        var userPwd = document.querySelector("input[name='pwd']").value
        var circleLoader = document.querySelector(`.${login.circleLoader}`)
        var pwdNotMatch = document.querySelector('#pwdNotMatch')
        var unameMissing = document.querySelector('#unameMissing')
        var unameReq = document.querySelector('#unameReq')
        var pwdReq = document.querySelector('#pwdReq')
        unameReq.style.display='none'
        pwdReq.style.display='none'
        if(!userName){
            unameReq.style.display='block'
            return
        }
        if(!userPwd){
            pwdReq.style.display='block'
            return
        }
        // if(userName=='root' && pwd=='root')
        // {
        //     setLoginVal(1);
        //     localStorage.setItem('loginVal', JSON.stringify(1));
        //     navigate('/home')
        // }
        else
        {
            circleLoader.style.display='inline-block'
            try {
                await axios.post(`https://thoughts-backend-7qku.onrender.com/login`,{userName,userPwd})
                    .then((res)=>{
                        if(res.status==201)
                        {
                            // console.log(JSON.stringify(res.data.msg.dateCreated))
                            setTimeout(()=>{
                                setLoginVal(res.data.msg.id)
                                setDateCreated(res.data.msg.dateCreated)
                                localStorage.setItem('loginVal', JSON.stringify(res.data.msg.id));
                                localStorage.setItem('dateCreated',JSON.stringify(res.data.msg.dateCreated))
                                navigate('/')
                                },1500)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                        if(err.response.status==403)
                        {
                            circleLoader.style.display='none'
                            unameMissing.style.display='block'
                        }
                        else if(err.response.status==402)
                        {
                            circleLoader.style.display='none'
                            pwdNotMatch.style.display='block'
                        }   

                    })
                
            } catch (error) {
                console.log(error)
            }
        }
    }
    const [pwdShow,setPwdShow] = useState(false)
    const togglePwdShow = ()=>{
        var pwd = document.querySelector("input[name='pwd']")
        setPwdShow(!pwdShow)
        if(pwd.getAttribute("type") =='password')
            pwd.setAttribute('type','text')
        else
            pwd.setAttribute('type','password')
    }

    return(
        <div className={login.content}>
            <div className={login.formbox}>
                <h1 style={{color:'white'}}>Welcome back to Thoughts <div className={login.circleLoader}></div> </h1>
                <form onSubmit={handleSubmit}>
                    <table id={login.tableForm}>
                        <tbody>
                            <tr>
                                <td><label htmlFor='uname'><b>Username</b></label></td>
                                <td><input name='uname' ></input></td>
                                <h5 id='unameMissing' style={{display:'none',color:"red"}}>Username Not Found</h5>
                                <h5 id='unameReq' style={{display:'none',color:"red"}}>Username Required</h5>
                            </tr>
                            <tr>
                                <td><label htmlFor='pwd'><b>Password</b></label></td>
                                <td><input name='pwd' type="password"></input><img id={login.eyes} src={pwdShow?eyeHide:eyeShow} onClick={togglePwdShow}></img></td>
                                <h5 id='pwdNotMatch' style={{display:'none',color:"red"}}>Incorrect Password</h5>
                                <h5 id='pwdReq' style={{display:'none',color:"red"}}>Password Required</h5>
                            </tr>
                            <tr>
                                <td colSpan={2}><button id={login.btn} type="submit" to="/home">Login</button></td>
                            </tr>
                            <tr>
                            <td colSpan={2}><h4 style={{cursor:"pointer",color:"whitesmoke"}} onClick={()=>{navigate('/signup')} }>Don't have an Account?</h4></td>
                        </tr>
                        </tbody>
                        

                    </table>
                </form>
            </div>
            
            

        </div>
    )
}