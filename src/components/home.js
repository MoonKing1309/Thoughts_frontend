import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import home from './home.module.css'
import axios from 'axios';
function Home(props) {
    const loginVal = props.loginState[0];
    const [allPosts,setAllPosts] = useState()
    const [loading,setLoading] = useState(true)
    const [once,setOnce] = useState(true)
    const navigate = useNavigate()

    const fetchLastThreePosts =  ()=>{
         axios.get(`https://thoughts-backend-7qku.onrender.com/home/${loginVal}`)
                .then((data)=>{
                    setAllPosts(data)
                })
                .catch((error)=> {
                    console.log(error)
                })
        
    }

    
    useEffect(()=>{
        if(allPosts!=undefined)
        {
            setLoading(false)
        }

        if(once && loginVal){
            fetchLastThreePosts()
            setOnce(false)

        }
    },[allPosts,loginVal])

    // while(!loginVal)
    // {
    //     return <div>Loading...</div>
    // }
    const dynamicallyRenderThreePosts = ()=>{
        var posts = []
        // console.log(allPosts)


        if(allPosts && allPosts.data.msg.length>0)
            console.log('here')
        // {
        //     var j =0
            // for(var i =0;i<allPosts.data.msg.length;i++){
            //         posts.push(
            //                 <div className={home.card} value={j} onClick={(event)=>{console.log(event.target.value)}}>
            //                     <div className={home.cardTitle}>
            //                         {loading?"Loading":allPosts.data.msg[i].postTitle}
            //                     </div>
            //                     <div className={home.cardDateTime}>
            //                         {loading?"Loading":`${allPosts.data.msg[i].postDate}/${allPosts.data.msg[i].postMonth+1}/${allPosts.data.msg[i].postYear}`}
            //                     </div>
            //                     <div className={home.cardText}>
            //                         {loading?"Loading":i}
            //                     </div>
            //                 </div>
            //         )
            // j++
        //     }
        // }
        else{
            posts.push(
                <div style={{margin:'auto auto'}}>No Posts Available! Try Creating one
                <br></br><button id={home.button} onClick={()=>{navigate('/create')}}>Create</button>
                </div>
            )
        }

        return posts
    }
    return ( 
        <div className={home.content}>
            {!loginVal?(
                <div className={home.homePage}>
                    Welcome to Thoughts!
                </div>
            ):(
                <div className={home.cardPage}>
                    {
                         allPosts && allPosts.data.msg.length>0 && allPosts.data.msg.map((post, index) => (
                                        <div className={home.card} key={index} onClick={(event)=>{navigate(`/view/${post.postID}`)}}>
                                            <div className={home.cardTitle}>
                                                {loading?"Loading":post.postTitle}
                                            </div>
                                            <div className={home.cardDateTime}>
                                                {loading?"Loading":`${post.postDate}/${post.postMonth+1}/${post.postYear}`}
                                            </div>
                                            <div className={home.cardText}>
                                                {loading?"Loading":`${post.postText}`}
                                            </div>
                                        </div>
                    ))
                    }
                    {
                        allPosts && allPosts.data.msg.length==0?(
                                <div style={{margin:'auto auto'}}>No Posts Available! Try Creating one!
                                <button id={home.button} onClick={()=>{navigate('/create')}}>Create</button>
                                </div>)
                        :console.log('not 0')
                    }

                </div>
            )}
        </div>
     );
}

export default Home;
