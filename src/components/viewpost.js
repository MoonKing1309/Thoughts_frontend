import { useNavigate ,useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import view from './view.module.css'
import axios from 'axios'

 
function ViewPost(props) {
    const loginVal = props.loginState[0];
    const {postID} = useParams();
    const [postTitle, setPostTitle] = useState();
    const [postText, setPostText] = useState();
    const navigate = useNavigate()

  
    const fetchPost = async ()=>{
        await axios.post(`https://thoughts-backend-7qku.onrender.com/history/${postID}`)
            .then((res)=>{
                const post = res.data.msg[0];
                setPostTitle(post.postTitle)
                setPostText(post.postText)
            })
            .catch((error)=>{
                console.log(error)
            })

    }

    useEffect(()=>{
        if(postID)
        {
            fetchPost()
            if(postTitle==undefined && postText==undefined)
            {
                return(()=>{})
            }
            
        }
        
    },[postID])

    const handleEdit = ()=>{
        navigate(`/edit/${postID}`)
    }
    const handleDelete =  async ()=>{
        await axios.delete(`https://thoughts-backend-7qku.onrender.com/edit/${postID}`)
        navigate(-1)
    }
    return ( 
        <div className={view.createContent}>
        <h1 view={{color:'white'}}>View Post</h1>
        <form >
            <div className={view.card}>
                <div className={view.createCardTitle}>
                    <input type='text' id={view.postTitle} value={postTitle} onChange={(event)=>{setPostTitle(event.target.value)}}readOnly ></input>
                </div>
                <div className={view.createCardDateTime}>
                    {new Date().toLocaleDateString().slice(0,10)}
                </div>
                <div className={view.createCardText}>
                <textarea type='text' id={view.postText} value={postText} onChange={(event)=>{setPostText(event.target.value)}} readOnly></textarea>
                </div>
            </div>
        <div className={view.contentButtons}>
            <button type='button' id={view.button}  onClick={handleEdit}> EDIT</button>
            <button type='button' id={view.button}  onClick={handleDelete}> DELETE</button>
            <button type='button' id={view.button}  onClick={()=>{navigate(-1)}}>Go Back</button>
            
        </div>
        </form>
    </div>
     );
}

export default ViewPost;