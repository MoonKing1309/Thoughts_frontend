import style from './form.module.css'
import eyeShow from '../images/eyeShow16.png'
import eyeHide from '../images/eyeHide16.png'
import { useState } from "react";

import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

function Signup(props) {

    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];
    let dateVal = props.dateCreated[0];
    let SetDateVal = props.dateCreated[1];
    const navigate = useNavigate()

    const onSubmit = async (event)=>{
        event.preventDefault()
        var uname = document.querySelector("input[name='uname']").value
        var pwd = document.querySelector("input[name='pwd']").value
        var rpwd = document.querySelector("input[name='rpwd']").value
        var pwdNotMatch = document.querySelector('#pwdNotMatch')
        var unameTaken = document.querySelector('#unameTaken')
        var unameReq = document.querySelector('#unameReq')
        var pwdReq = document.querySelector('#pwdReq')
        var verPwdReq = document.querySelector('#verPwdReq')
        unameTaken.style.display='none'
        unameReq.style.display='none'
        pwdReq.style.display='none'
        verPwdReq.style.display='none'
        var circleLoader = document.querySelector(`.${style.circleLoader}`)
        if(!uname){
            unameReq.style.display='block'
            return
        }
        if(!pwd){
            pwdReq.style.display='block'
            return
        }
        if(!rpwd){
            verPwdReq.style.display='block'
            return
        }
        if(pwd!=rpwd)
        {
            pwdNotMatch.style.display='block'
            //add event listener that will remove the warning without pressing submit button
            return
        }
        else
        {
            pwdNotMatch.style.display='none'
            circleLoader.style.display='inline-block'
        }
        try {
            var userName = uname
            var userPwd = pwd
            await axios.post(`https://thoughts-backend-7qku.onrender.com/signup`,{userName,userPwd})
                .then((res)=>{
                    if(res.status==201)
                    {
                        axios.post(`https://thoughts-backend-7qku.onrender.com/login`,{userName,userPwd})
                        .then((res)=>{
                            if(res.status==201)
                            {
                                setTimeout(()=>{
                                    setLoginVal(res.data.msg.id)
                                    SetDateVal(res.data.msg.dateCreated)
                                    localStorage.setItem('loginVal', JSON.stringify(res.data.msg.id));
                                    localStorage.setItem('dateCreated',JSON.stringify(res.data.msg.dateCreated))
                                    navigate('/')
                                    },1500)
                                
                            }
                    })
                        
                    }
                })
                .catch((err)=>{
                    if(err.response.status==409)
                    {
                        circleLoader.style.display='none'
                        unameTaken.style.display='block'
                    }
                })
            
        } catch (error) {
            console.log(error)
        }


        
    }
    const [rpwdShow,setRPwdShow] = useState(false)
    const [pwdShow,setPwdShow] = useState(false)
    const togglePwdShow = ()=>{
        var pwd = document.querySelector("input[name='pwd']")
        setPwdShow(!pwdShow)
        if(pwd.getAttribute("type") =='password')
            pwd.setAttribute('type','text')
        else
            pwd.setAttribute('type','password')
    }

    const toggleRPwdShow = ()=>{
        var rpwd = document.querySelector("input[name='rpwd']")
        setRPwdShow(!rpwdShow)
        if(rpwd.getAttribute("type") =='password')
        
            rpwd.setAttribute('type','text')
        else
            rpwd.setAttribute('type','password')
    }
    return ( 
        <div className={style.content}>
            <div className={style.formbox}>
                <h1 style={{color:'white'}}>Welcome to Thoughts  <div className={style.circleLoader}></div> </h1>
                <form>
                    <table id={style.tableForm}>
                        <tr>
                            <td><label for='uname'><b>Username</b></label></td>
                            <td><input name='uname' ></input></td>
                            <h5 id='unameTaken' style={{display:'none',color:"red"}}>Username Already taken</h5>
                            <h5 id='unameReq' style={{display:'none',color:"red"}}>Username Required</h5>
                        </tr>
                        <tr>
                            <td><label for='pwd'><b>Password</b></label></td>
                            <td><input name='pwd' type="password"></input><img id={style.eyes} src={pwdShow?eyeHide:eyeShow} onClick={togglePwdShow}></img></td>
                            <h5 id='pwdReq' style={{display:'none',color:"red"}}>Password Required</h5>
                        </tr>
                        <tr>
                            <td><label for='rpwd'><b>Confirm Password</b></label></td>
                            <td><input name='rpwd'  type="password"></input><img id={style.eyes} src={rpwdShow?eyeHide:eyeShow} onClick={toggleRPwdShow}></img></td>
                            <h5 id='verPwdReq' style={{display:'none',color:"red"}}>Confirm your Password</h5>
                        </tr>
                        <tr>
                            <td colSpan={2}><button id='btn' type='submit' onClick={onSubmit}>Sign-up</button></td>
                        </tr>
                        <tr>
                            <td colSpan={2}> <h4 id='pwdNotMatch' style={{display:'none',color:"red"}}>Password does not match</h4></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><h4 style={{cursor:"pointer",color:"whitesmoke"}} onClick={()=>{navigate('/login')} }>Already have an Account?</h4></td>
                        </tr>

                    </table>
                </form>
            </div>
            
            

        </div>
     );
}

export default Signup;
