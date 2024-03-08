import { useEffect, useState } from 'react';
import style from './history.module.css';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

import db from '../images/db.png'
import edit from '../images/edit.png'



function HistoryPosts(props) {
    // const [leap,setLeap] = useState(false)
    let loginVal = props.loginState[0];
    const navigate = useNavigate()
    // console.log(loginVal)
    const {year,month} = useParams()
    const [posts,setPosts] = useState()
    // if(year%100==0 && year%400==0)
    // {
    //     setLeap(true)
    // }
    // else if(year%100!=0 && year%4==0)
    // {
    //     setLeap(true)
    // }
    // else
    // {
    //     setLeap(false)
    // }
    const monthIndex = {
        0 : 'January',
        1 : 'February',
        2 : 'March',
        3 : 'April',
        4 : 'May',
        5 : 'June',
        6 : 'July',
        7 : 'August',
        8 : 'September',
        9 : 'October',
        10: 'November',
        11: 'December'
    }
    // let dateCount = {
    //     Jan:31,
    //     Feb:leap?29:28,
    //     Mar:31,
    //     Apr:30,
    //     May:31,
    //     Jun:30,
    //     Jul:31,
    //     Aug:31,
    //     Sep:30,
    //     Oct:31,
    //     Nov:30,
    //     Dec:31
    // }
    const fetchPosts = async ()=>{
        // console.log(loginVal)
        await axios.get(`https://thoughts-backend-7qku.onrender.com/history/${year}/${month}/${loginVal}`)
        .then((data) =>{
            const tempData = data.data;
            setPosts(tempData); 
            console.log(tempData)
        } )
        .catch((err) => console.log(err))
    }

    const handleEdit = (postID)=>{
        navigate(`/edit/${postID}`)
    }
    const handleDelete = async (postID)=>{
        setPosts((prevPosts) => prevPosts.filter((post) => post.postID !== postID));
        await axios.delete(`https://thoughts-backend-7qku.onrender.com/edit/${postID}`)

    }
    useEffect(()=>{
        if(loginVal!=undefined)
            fetchPosts()
    },[loginVal])
    return ( 
        <div className={style.content}>
            {posts && posts.map((post, index) => (
                <div className={style.postCardPage}>
                            <div className={style.postCard} key={index} onClick={()=>{navigate(`/view/${post.postID}`)}}>
                                <div className={style.postCardTitle}>
                                    {post.postTitle}
                                    <a id={style.edit} onClick={()=>handleEdit(post.postID)}><img src={edit}></img></a>
                                    <a id={style.delete} onClick={()=>handleDelete(post.postID)}><img src={db}></img></a>
                                </div>
                                <div className={style.postCardDateTime}>
                                    {`${post.postDate}/${post.postMonth+1}/${post.postYear}`}
                                </div>
                                <div className={style.postCardText}>
                                    {`${post.postText.substring(0, 50)}`}
                                </div>
                            </div>
                              
                        </div>
                ))
                
            }
           { (posts && posts.length==0)?
           (<div style={{textAlign:'center',margin:'auto auto'}}>No Posts Available for this month!
            <button id={style.button} onClick={()=>{navigate('/create')}}>Create</button>
                                </div>):console.log('')    }
            <div className={style.backDiv}>
            <button className={style.backButton} onClick={()=>{navigate(-1)}}>Go Back</button>
            </div>
                
        </div>
     );
}

export default HistoryPosts;