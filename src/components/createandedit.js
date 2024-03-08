import { useNavigate, useParams } from 'react-router-dom';
import style from './createandedit.module.css';
import { useEffect ,useState } from 'react';
import axios from 'axios'
function CreateAndEdit(props) {

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        var userID = loginVal
        const postData = {
            userID,
            postTitle,
            postText
        }
        try {
            if(postID)
            {
                await axios.put(`https://thoughts-backend-7qku.onrender.com/edit/${postID}`,postData)
            }
            else{
                console.log('post Data is ' , postData)
                await axios.post(`https://thoughts-backend-7qku.onrender.com/create`,postData)
            }

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <div className={style.createContent}>
            <h1 style={{color:'white'}}>{postID?`Edit Post`:`Create Post`}</h1>
            <form>
                <div className={style.card}>
                    <div className={style.createCardTitle}>
                        <input type='text' id={style.postTitle} value={postTitle} onChange={(event)=>{setPostTitle(event.target.value)}} placeholder={postID?null:'Name your thought'} ></input>
                    </div>
                    <div className={style.createCardDateTime}>
                        {new Date().toLocaleDateString().slice(0,10)}
                        
                    </div>
                    <div className={style.createCardText}>
                    <textarea type='text' id={style.postText} value={postText} onChange={(event)=>{setPostText(event.target.value)}} placeholder='Start typing your thoughts'></textarea>
                    </div>
                    {/* <br></br> */}
                </div>
            <div className={style.contentButtons}>
                <button type='submit' id={style.button}  onClick={handleSubmit}> SUBMIT</button>
                <button type='button' onClick={()=>{navigate('/write')}} style={{display:postID?'none':'inline-block'}}>WRITE</button>
                <button type='button' id={style.button}  onClick={()=>{navigate(-1)}}>Go Back</button>

            </div>
            </form>
            {/* <form>
                <h1 style={{color:'white'}}>{postID?`Edit Post`:`Create Post`}</h1>
                <table id={style.postTitleTable}>
                    <tr>
                        <td>
                            <input type='text' id={style.postTitle} value={postTitle} onChange={(event)=>{setPostTitle(event.target.value)}} placeholder={postID?null:'Name your thought'} ></input>
                            
                        </td>
                    </tr>
                </table>
                <table id={style.postTextTable}>
                    <tr>
                        <td>
                            <textarea type='text' id={style.postText} value={postText} onChange={(event)=>{setPostText(event.target.value)}} placeholder='Start typing your thoughts'></textarea>
                        </td>
                    </tr>
                </table>

                <button type='submit'  onClick={handleSubmit}> SUBMIT</button>
                <button type='button' onClick={()=>{navigate('/write')}} style={{display:postID?'none':'inline-block'}}>Write</button>
            </form> */}
        </div>
     );
}

export default CreateAndEdit;